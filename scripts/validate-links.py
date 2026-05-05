import requests
from bs4 import BeautifulSoup
import sys

def check_url(url):
    try:
        response = requests.get(url, timeout=10)
        return response.status_code == 200
    except Exception:
        return False

def validate_links(target_url):
    print(f"🕵️ Starting Full-Lifecycle Validation for: {target_url}")
    print("-" * 50)
    
    try:
        response = requests.get(target_url, timeout=10)
        if response.status_code != 200:
            print(f"❌ Critical Error: Base URL returned {response.status_code}")
            return
    except Exception as e:
        print(f"❌ Critical Error: Could not connect to {target_url}. {str(e)}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 1. Check Internal/External Links
    links = [a.get('href') for a in soup.find_all('a') if a.get('href')]
    print(f"🔗 Found {len(links)} links. Validating...")
    
    broken_links = []
    for link in set(links):
        full_url = link if link.startswith('http') else f"{target_url.rstrip('/')}/{link.lstrip('/')}"
        if not check_url(full_url):
            broken_links.append(full_url)
            print(f"  ❌ Broken: {full_url}")
        else:
            print(f"  ✅ OK: {full_url}")

    # 2. Check Assets (Images, Scripts, Styles)
    assets = []
    assets += [img.get('src') for img in soup.find_all('img') if img.get('src')]
    assets += [script.get('src') for script in soup.find_all('script') if script.get('src')]
    assets += [link.get('href') for link in soup.find_all('link', rel='stylesheet') if link.get('href')]
    
    print(f"\n🖼️ Found {len(assets)} assets. Validating...")
    broken_assets = []
    for asset in set(assets):
        full_url = asset if asset.startswith('http') else f"{target_url.rstrip('/')}/{asset.lstrip('/')}"
        if not check_url(full_url):
            broken_assets.append(full_url)
            print(f"  ❌ Broken Asset: {full_url}")
        else:
            print(f"  ✅ OK: {full_url}")

    # Final Summary
    print("-" * 50)
    if not broken_links and not broken_assets:
        print("🌟 VALIDATION SUCCESS: Zero broken links or assets detected.")
        print("🚀 Production environment is HEALTHY.")
    else:
        print(f"⚠️ VALIDATION FAILED: Found {len(broken_links)} broken links and {len(broken_assets)} broken assets.")
        sys.exit(1)

if __name__ == "__main__":
    # Example usage: python validate-links.py http://localhost:8000/v1/docs
    target = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/v1/docs"
    validate_links(target)
