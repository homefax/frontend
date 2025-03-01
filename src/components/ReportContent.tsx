import React from 'react';

interface ReportContentProps {
  content: string;
  contentType: string;
}

const ReportContent: React.FC<ReportContentProps> = ({ content, contentType }) => {
  // Function to convert markdown-like text to HTML
  const formatContent = (text: string) => {
    // Replace headers
    let formattedText = text
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    
    // Replace bold text
    formattedText = formattedText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Replace italic text
    formattedText = formattedText.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Replace lists
    formattedText = formattedText.replace(/^- (.+)$/gm, '<li>$1</li>');
    formattedText = formattedText.replace(/(<li>.+<\/li>\n)+/g, '<ul>$&</ul>');
    
    // Replace numbered lists
    formattedText = formattedText.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    formattedText = formattedText.replace(/(<li>.+<\/li>\n)+/g, '<ol>$&</ol>');
    
    // Replace horizontal rules
    formattedText = formattedText.replace(/^---$/gm, '<hr />');
    
    // Replace tables
    const tableRegex = /\|(.+)\|\n\|[-|]+\|\n((\|.+\|\n)+)/gm;
    formattedText = formattedText.replace(tableRegex, (match) => {
      // Process table headers
      const lines = match.split('\n');
      const headers = lines[0].split('|').filter(cell => cell.trim() !== '');
      
      let tableHtml = '<table class="report-table"><thead><tr>';
      headers.forEach(header => {
        tableHtml += `<th>${header.trim()}</th>`;
      });
      tableHtml += '</tr></thead><tbody>';
      
      // Process table rows (skip header and separator rows)
      for (let i = 2; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        const cells = lines[i].split('|').filter(cell => cell.trim() !== '');
        tableHtml += '<tr>';
        cells.forEach(cell => {
          tableHtml += `<td>${cell.trim()}</td>`;
        });
        tableHtml += '</tr>';
      }
      
      tableHtml += '</tbody></table>';
      return tableHtml;
    });
    
    // Replace paragraphs (must be done last)
    formattedText = formattedText.replace(/^([^<].+)$/gm, '<p>$1</p>');
    
    // Replace double line breaks with a single line break
    formattedText = formattedText.replace(/\n\n/g, '\n');
    
    return formattedText;
  };
  
  if (contentType === 'text/plain') {
    return (
      <div 
        className="report-content-formatted"
        dangerouslySetInnerHTML={{ __html: formatContent(content) }}
      />
    );
  } else {
    return (
      <div className="report-document-content">
        <iframe 
          src={`data:${contentType};base64,${btoa(content)}`}
          title="Report Document"
          width="100%"
          height="500px"
        />
      </div>
    );
  }
};

export default ReportContent;