import { useEffect, useRef, useState } from "react";
import search = chrome.bookmarks.search;

const App = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>(null);
  const [currentURLHost, setCurrentURLHost] = useState('');
  const [allHistories, setAllHistories] = useState<
    chrome.history.HistoryItem[]
  >([]);

  const query = useRef<HTMLInputElement>(null);

  // TODO:startTime, endTimeをテキストボックスから指定
  let searchText = ''

  useEffect(() => {
    let host;
    let microsecondsPerDay = 1000 * 60 * 60 * 24
    // Search up to 30 days in advance.
    let searchStartDate =(new Date).getTime() - microsecondsPerDay * 365 * 20
    const searchQuery = {
      text: searchText,
      startTime: searchStartDate,
      maxResults: 2000
    }

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      let tab = tabs[0]
      setCurrentTab(tab)
      host = new URL(tab.url || '').host;
      setCurrentURLHost(host)

      // use `url` here inside the callback because it's asynchronous!
      const regexp = new RegExp(`.*${host}.*`);

      chrome.history.search(searchQuery, (historyItems) => {
        let targetHistories = [];
        historyItems.forEach(historyItem => {
          if(regexp.test(historyItem.url || '')) {
            targetHistories.push(historyItem)
          }
          // targetHistories.push(historyItem)
        })
        setAllHistories(targetHistories);
      });
    });
  }, []);

  return (
    <div className='mx-10 my-4'>
      <div className='flex'>
        <img className='w-6 mr-1' src={ currentTab?.favIconUrl } />
        <div className='text-lg font-bold'>
          {/*{ currentURLHost } */}
          History
        </div>
      </div>
      {allHistories.map((item, index) => {
        return (
          <div className='my-4'>
            <div clasName=''>
              <span className='text-base cursor-pointer'
                    key={index}
                    onClick={ () => { chrome.tabs.create({ url: item.url }) }}
              >{item.title}</span>
              <span className='ml-5 text-xs'>
                { item.visitCount > 1 && (
                  `(${ item.visitCount}) `
                )}
                { new Date(item.lastVisitTime as number).toLocaleDateString()}
              </span>
            </div>
            <span className='ml-5 text-sm text-red-500 cursor-pointer'>{ new URL(item.url || '').pathname }</span>

          </div>
        );
      })}
    </div>
  );
};

export default App;
