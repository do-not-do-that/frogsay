// 유틸리티 함수: 문자 폭 계산
function getDisplayWidth(text: string): number {
  return [...text].reduce((width, char) => {
    // 유니코드 범위를 확인해 한글이면 2칸, 아니면 1칸
    return width + (char.charCodeAt(0) > 0x1100 ? 2 : 1);
  }, 0);
}

// 유틸리티 함수: 문자 폭에 맞게 패딩 추가
function padStringToWidth(text: string, width: number): string {
  const currentWidth = getDisplayWidth(text);
  const padding = width - currentWidth;
  return text + ' '.repeat(padding > 0 ? padding : 0);
}

export function formatMessage(message: string, art: string): string {
  const maxLineLength = 40; // 말풍선 한 줄의 최대 길이
  const words = message.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  // 메시지를 최대 길이에 따라 줄로 나누기
  words.forEach((word) => {
    if (getDisplayWidth(currentLine + word) > maxLineLength) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  // 말풍선 테두리 생성
  const bubbleWidth = Math.max(...lines.map(getDisplayWidth));
  const border = '-'.repeat(bubbleWidth + 2);
  const formattedLines = lines.map(
    (line) => `| ${padStringToWidth(line, bubbleWidth)} |`,
  );

  // 말풍선 아래와 페페 입 연결
  const bubbleTail = `\\`.padStart(bubbleWidth + 3, ' '); // 슬래시 위치 조정

  // 말풍선과 페페 아트를 결합
  const speechBubble = `
   ${border}
  ${formattedLines.join('\n  ')}
   ${border}
  ${bubbleTail}
  `;
  return `${speechBubble}\n${art}`;
}
