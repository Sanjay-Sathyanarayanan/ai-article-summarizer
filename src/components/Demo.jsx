import { useState, useEffect } from "react"
import { copy, linkIcon, loader, tick  } from "../assets"
import { useLazyGetSummaryQuery } from "../services/article"

const Demo = () => {

  const [article, setArticle] = useState({
    url:"",
    summary:""
  })
  
  const [urlHistory, setUrlHistory] = useState([]);

  const [copied, setCopied]= useState("");
  
  // the 'useLazyGetSummaryQuery' hook returns the summarized article and it is stored in the getSummary() function 
  // the getSummary() function calls the rapidApi to get the summary of the article
  // the hook also contains  the error and isFetching  
  const [getSummary, {error, isFetching}]=useLazyGetSummaryQuery();


  useEffect( ()=>{
    const articlesFromLocalStorage= JSON.parse(localStorage.getItem('articles'));

    if(articlesFromLocalStorage){
      setUrlHistory(articlesFromLocalStorage);
    }
  }, [])



  function handleChange(event){
    
    setArticle(prevArticle => ({...prevArticle, url:event.target.value}));

  }

  async function handleSubmit(event){
    event.preventDefault();
    //passing the article url to the rapidApi
   const {data} = await getSummary({articleUrl: article.url});
    
   if(data?.summary){

    const newArticle ={...article , summary:data.summary};

    const allUrlHistory =[newArticle, ...urlHistory];
    
    setArticle(newArticle);
    if(allUrlHistory)
    setUrlHistory(allUrlHistory);
     
    console.log(allUrlHistory);

    localStorage.setItem('articles', JSON.stringify(allUrlHistory));
    

   }
  }
  
  const handleCopy =(copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(()=> setCopied(false), 2000);
  }

  function handleDelete(url){
   setUrlHistory (prevURls=>prevURls.filter(item => item.url!==url));
  }

  return (
    <section className="mt-16 w-full max-w-xl" >
      {/* Search  */}
      <div className="flex flex-col w-full gap-2">
        <form className="relative flex items-center justify-center"  onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link-icon" className="absolute my-2 ml-3 w-5 left-0" />
          <input type="url"
                  placeholder="Enter a URL"
                  value={article.url}
                  onChange={handleChange}
                className="url_input peer" />
          
          <button className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700" >
              ↵
          </button>
        </form>
        {/* URL History  */}

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto ">
          {urlHistory.map((item, index)=>{
            return(
              <div key={`link-${index}`}
                     
                      className="link_card"
                      > 

                      <div className="copy_btn" onClick={()=>handleCopy(item.url)}>
                        <img src={copied === item.url? tick : copy} alt="copy-icon" className="w-[40%] h-[40%] object-contain"/>
                      </div>
                        <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate"  onClick={() => setArticle(item)}>
                          {item.url}
                        </p>
                        <div className="copy_btn text-sm text-center hover:bg-red-400" onClick={()=>handleDelete(item.url)}>x</div>
              </div>
            )
          })}
        </div>
      </div>
         {/* Display Article Summary  */}
         <div className="my-10 max-w-full flex justify-center items-center">
            {  article.url && (isFetching ? (
                <img src={loader} alt="loader" className="w-20 h-20 object-contain "/>
              ) : error ? (
                <p className="font-inter font-bold text-black text-center ">
                  Well that's not suppossed to happen... Try again!
                <br />
                    <span>
                      {error?.data?.error}
                    </span>
                </p>
              ) : (
                article.summary && (
                  <div className="flex flex-col gap-3">
                    <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                      Article <span className="blue_gradient">Summary</span>
                    </h2>
                      <div className="summary_box">
                        <p className="font-inter font-medium text-sm text-gray-700 ">{article.summary}</p>
                      </div>
                  </div>
           )
              )
              )}
         </div>
    </section>
  )
}

export default Demo

