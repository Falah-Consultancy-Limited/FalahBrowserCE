import React, { useState, useEffect, useRef } from 'react';
import WhisperPanel from './WhisperPanel';
import { Tab, ClassificationResult } from '../types';

const BrowserShell: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([{ id: 1, url: 'https://www.google.com', active: true, verdict: 'safe' }]);
  const [activeTabId, setActiveTabId] = useState<number>(1);
  const [urlInput, setUrlInput] = useState<string>('https://www.google.com');
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [currentVerdict, setCurrentVerdict] = useState<ClassificationResult | null>(null);
  
  const webviewRef = useRef<any>(null);

  const activeTab = tabs.find(t => t.id === activeTabId);

  const handleNavigate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let url = urlInput;
      if (!url.startsWith('http')) url = 'https://' + url;
      updateTab(activeTabId, { url });
    }
  };

  const updateTab = (id: number, data: Partial<Tab>) => {
    setTabs(tabs.map(t => t.id === id ? { ...t, ...data } as Tab : t));
  };

  useEffect(() => {
    if (webviewRef.current) {
      const webview = webviewRef.current;
      
      const handleLoadCommit = async (e: any) => {
        if (e.isMainFrame) {
          setUrlInput(e.url);
          // Classification logic
          const text = await webview.executeJavaScript('document.body.innerText');
          const result = await window.falahAPI.classifyPage(e.url, text);
          setCurrentVerdict(result);
          updateTab(activeTabId, { verdict: result.verdict });
          
          if (result.verdict !== 'safe') {
            setIsPanelOpen(true);
          }
        }
      };

      webview.addEventListener('load-commit', handleLoadCommit);
      return () => webview.removeEventListener('load-commit', handleLoadCommit);
    }
  }, [activeTabId]);

  return (
    <div className="flex flex-col h-screen bg-falah-indigo text-falah-parchment">
      {/* Toolbar */}
      <div className="flex items-center p-2 bg-falah-indigo border-b border-gray-700 space-x-2">
        <div className="flex space-x-2 mr-4">
          <button className="p-1 hover:bg-gray-800 rounded">←</button>
          <button className="p-1 hover:bg-gray-800 rounded">→</button>
          <button className="p-1 hover:bg-gray-800 rounded">↻</button>
        </div>
        
        <input 
          type="text" 
          className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-1 outline-none focus:border-falah-gold transition-colors"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={handleNavigate}
        />

        <button 
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className={`p-1 rounded-full transition-all duration-500 ${
            currentVerdict?.verdict === 'warning' ? 'shadow-[0_0_15px_#d4af37]' : 
            currentVerdict?.verdict === 'blocked' ? 'shadow-[0_0_15px_#ef4444]' : ''
          }`}
        >
          <img src="/lantern.png" className="w-8 h-8" alt="Lantern" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-900 overflow-x-auto">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`px-4 py-2 text-sm cursor-pointer border-r border-gray-800 min-w-[150px] flex justify-between items-center ${
              tab.id === activeTabId ? 'bg-falah-indigo border-t-2 border-t-falah-gold' : 'hover:bg-gray-800'
            }`}
          >
            <span className="truncate">{tab.url}</span>
            <div className={`w-2 h-2 rounded-full ${
              tab.verdict === 'safe' ? 'bg-green-500' : 
              tab.verdict === 'caution' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
          </div>
        ))}
        <button 
          onClick={() => {
            const newId = tabs.length + 1;
            setTabs([...tabs, { id: newId, url: 'falah://lantern', active: false, verdict: 'safe' }]);
            setActiveTabId(newId);
          }}
          className="px-4 py-2 hover:bg-gray-800"
        >+</button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex relative">
        <div className="flex-1 bg-white">
          <webview 
            ref={webviewRef}
            src={activeTab?.url === 'falah://lantern' ? './index.html#/lantern' : activeTab?.url}
            className="w-full h-full"
            // @ts-ignore
            allowpopups="true"
          />
        </div>

        {/* Whisper Panel */}
        <WhisperPanel 
          isOpen={isPanelOpen} 
          onClose={() => setIsPanelOpen(false)} 
          verdict={currentVerdict}
        />
      </div>
    </div>
  );
};

export default BrowserShell;
