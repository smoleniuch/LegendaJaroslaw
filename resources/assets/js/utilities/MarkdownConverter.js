import {Converter as ShowdownConverter} from "showdown";

function MarkdownConverter(options = {}) {

     options = {
      tables: true,
      simplifiedAutoLink: true,
      ghCodeBlocks:false,
      disableForced4SpacesIndentedSublists:false,
      emoji:true,
      ...options,
    }

    return new ShowdownConverter(options);
}

export default MarkdownConverter