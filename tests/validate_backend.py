import json
import requests
import sys

BASE_URL = "http://127.0.0.1:8000/v1"

def run_tests():
    print("🚀 Starting Falah Browser Backend Validation...")
    
    try:
        with open("tests/test-matrix.json", "r") as f:
            matrix = json.load(f)
    except FileNotFoundError:
        print("❌ Error: test-matrix.json not found.")
        sys.exit(1)

    passed = 0
    total = len(matrix)

    for case in matrix:
        print(f"Testing: {case['url']}...", end=" ")
        try:
            response = requests.post(
                f"{BASE_URL}/classify",
                json={"url": case["url"], "text": case["text"]},
                timeout=5
            )
            data = response.json()
            
            if data["verdict"] == case["expected_verdict"]:
                print("✅ PASSED")
                passed += 1
            else:
                print(f"❌ FAILED (Expected: {case['expected_verdict']}, Got: {data['verdict']})")
        except Exception as e:
            print(f"❌ ERROR: {str(e)}")

    print(f"\n📊 Test Summary: {passed}/{total} Passed")
    
    if passed == total:
        print("🌟 All core classification rules are validated!")
    else:
        print("⚠️ Some tests failed. Review the rules in server.py.")

if __name__ == "__main__":
    run_tests()
