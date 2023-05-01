import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";

const configurations = new Configuration({
  apiKey: import.meta.env.VITE_MY_API_KEY,
});
const openai = new OpenAIApi(configurations);

function App() {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputPrompt, setInputPrompt] = useState(null);
  async function fetchData() {
    try {
      if (inputPrompt == null) return;
      setIsLoading(true);
      const response = await openai.createImage({
        prompt: inputPrompt,
        n: 1,
        size: "512x512",
      });
      setImage(response.data.data[0].url);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }
  return (
    <div className="main">
      <h1>Image Generator</h1>
      <input
        type="text"
        placeholder="Enter Prompt"
        className="inputBox"
        value={inputPrompt}
        onChange={(e) => setInputPrompt(e.target.value)}
      />
      <button onClick={fetchData}>Generate</button>
      {isLoading == true ? (
        <>
          <span>Loading...</span>
          <span>Please wait until your image is ready</span>
        </>
      ) : (
        <img src={image} alt="" />
      )}
    </div>
  );
}

export default App;
