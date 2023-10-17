const subwayLineNames = {
    '1001': '1호선',
    '1002': '2호선',
    '1003': '3호선',
    '1004': '4호선',
    '1005': '5호선',
    '1006': '6호선',
    '1007': '7호선',
    '1008': '8호선',
    '1009': '9호선',
    '1061': '중앙선',
    '1063': '경의중앙선',
    '1065': '공항철도',
    '1067': '경춘선',
    '1075': '수인분당선',
    '1077': '신분당선',
    '1092': '우이신설선',
    '1093': '서해선',
    '1081': '경강선',
};
function getSubwayInfo() {
    const stationName = document.getElementById("station").value;
    const resultsDiv = document.getElementById('results');

    if (!stationName) {
        resultsDiv.textContent = '';
        return; 
    }

    // Create XMLHttpRequest
    const xhr = new XMLHttpRequest();

   var apiKey='714853757159414f383473676b594b';
   var apiUrl = `http://swopenAPI.seoul.go.kr/api/subway/${apiKey}/xml/realtimeStationArrival/0/5/${stationName}`;

    xhr.open('GET', apiUrl, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // 解析XML响应
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');
                const items = xmlDoc.getElementsByTagName('row');

                // 处理API响应并显示结果
                resultsDiv.innerHTML = ''; // 清空之前的结果

                if (items.length > 0) {
                    for (let i = 0; i < items.length; i++) {
                        const subwayId = items[i].getElementsByTagName('subwayId')[0].textContent;
                        const trainLineNm = items[i].getElementsByTagName('trainLineNm')[0].textContent;
                        const barvlDtInSeconds = parseInt(items[i].getElementsByTagName('barvlDt')[0].textContent);

                        // 将秒数转换为分钟和秒数
                        const minutes = Math.floor(barvlDtInSeconds / 60);
                        const seconds = barvlDtInSeconds % 60;

                        // 查找地铁线路的名称
                        const subwayLineName = subwayLineNames[subwayId];

                        const subwayInfo = document.createElement('p');
                        subwayInfo.textContent = `${subwayLineName},${trainLineNm},예상도착시간: ${minutes}분${seconds}초`;
                        resultsDiv.appendChild(subwayInfo);
                    }
                } else {
                    resultsDiv.textContent = '정보를 없습니다';
                }
            } else {
                resultsDiv.textContent = '실패';
            }
        }
    };

    // 发送请求
    xhr.send();

    // 定义一个函数来更新时间
    function updateTimer() {
        const subwayInfos = resultsDiv.getElementsByTagName('p');
        for (let i = 0; i < subwayInfos.length; i++) {
            const subwayInfo = subwayInfos[i];
            const timeText = subwayInfo.textContent.match(/\d+분\d+초/); // 匹配时间格式，例如 2분30초
            if (timeText) {
                const [minutes, seconds] = timeText[0].match(/\d+/g).map(Number);
                const totalSeconds = minutes * 60 + seconds;
                if (totalSeconds > 0) {
                    const newTime = `${Math.floor((totalSeconds - 1) / 60)}분${(totalSeconds - 1) % 60}초`;
                    subwayInfo.textContent = subwayInfo.textContent.replace(timeText[0], newTime);
                } else {
                    subwayInfo.textContent = subwayInfo.textContent.replace(timeText[0], "도착");
                }
            }
        }
    }

    // 调用 updateTimer 函数，每秒更新一次时间
    const timerInterval = setInterval(updateTimer, 1000);


}