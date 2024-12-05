import boxen from 'boxen';

export function formatMessage(message: string, art: string): string {
  const maxLineLength = 40; // 한 줄 최대 길이
  const words = message.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  // 메시지를 줄바꿈하여 배열로 구성
  words.forEach((word) => {
    if (currentLine.length + word.length + 1 > maxLineLength) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  // 줄들을 합쳐 최종 메시지 생성
  const formattedText = lines.join('\n');

  // boxen으로 박스를 생성
  const boxedMessage = boxen(formattedText, {
    padding: 1,
    borderStyle: 'round',
    borderColor: 'green',
    backgroundColor: 'black',
  });

  // 아스키 아트를 줄 단위로 분해
  const artLines = art.split('\n');
  const boxLines = boxedMessage.split('\n');

  // 20번째 줄에 박스를 병렬로 추가
  const insertLineIndex = 19; // 배열은 0부터 시작하므로 20번째 줄은 index 19
  const padding = ' '.repeat(10); // 박스를 아스키 아트 오른쪽으로 밀기 위한 공백

  const combinedLines = artLines.map((line, index) => {
    if (index >= insertLineIndex && index - insertLineIndex < boxLines.length) {
      // 박스가 시작하는 줄과 박스의 나머지 줄을 병합
      const boxLine = boxLines[index - insertLineIndex];
      return `${line}${padding}${boxLine}`;
    }
    return line; // 나머지 줄은 그대로 유지
  });

  return combinedLines.join('\n'); // 최종 출력
}
