import OptionBar from './options/OptionBar';

export default function App() {
  const handleMouse = () => {
    let getSelectedText = null;
    document.onmouseup = () => {
      getSelectedText = window.getSelection().toString();
      if (getSelectedText.length > 0 && getSelectedText != null) {
        return getSelectedText;
      }
    }
  };
    

    // if (getSelectedText.length > 0 && getSelectedText != null) {
    //   return (
    //     <OptionBar text={getSelectedText}/>
    //   );
  //   }
  // }
  return <OptionBar text={handleMouse}/>
}
