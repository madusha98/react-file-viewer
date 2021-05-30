// Copyright (c) 2017 PlanGrid, Inc.

import React, { useEffect, useRef } from 'react';
import mammoth from 'mammoth';

import 'styles/docx.scss';
import Loading from '../loading';

const DocxViewer = (props) => {
  const docxRef = useRef(null);
  useEffect(() => {
    const jsonFile = new XMLHttpRequest();
    jsonFile.open('GET', props.filePath, true);
    jsonFile.send();
    jsonFile.responseType = 'arraybuffer';
    jsonFile.onreadystatechange = () => {
      if (jsonFile.readyState === 4 && jsonFile.status === 200) {
        mammoth
          .convertToHtml(
            { arrayBuffer: jsonFile.response },
            { includeDefaultStyleMap: true },
          )
          .then((result) => {
            const docEl = document.createElement('div');
            docEl.className = 'document-container';
            docEl.innerHTML = result.value;
            // document.getElementById('docx').innerHTML = docEl.outerHTML;
            docxRef.current.innerHTML = docEl.outerHTML;
          })
          .catch((a) => {
            console.log('alexei: something went wrong', a);
          })
          .done();
      }
    };
  });

  return (
    <div ref={docxRef}>
      <Loading />
    </div>
  );
};

export default DocxViewer;
