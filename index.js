function getSubwayInfo() {
    const stationName = document.getElementById("station").value;
    const resultsDiv = document.getElementById('results');

    if (!stationName) {
        resultsDiv.textContent = '';
        return; // 如果输入为空，不执行后续操作
    }

    // 创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest();

    var apiKey = '714853757159414f383473676b594b';
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
                        const trainLineNm = items[i].getElementsByTagName('trainLineNm')[0].textContent;
                        const barvlDtInSeconds = parseInt(items[i].getElementsByTagName('barvlDt')[0].textContent);

                        // 将秒数转换为分钟和秒数
                        const minutes = Math.floor(barvlDtInSeconds / 60);
                        const seconds = barvlDtInSeconds % 60;

                        const subwayInfo = document.createElement('p');
                        subwayInfo.textContent = `${trainLineNm}, 예상도착시간: ${minutes}분${seconds}초`;
                        resultsDiv.appendChild(subwayInfo);
                    }
                } else {
                    resultsDiv.textContent = '정보를 없습니다';
                }
            } else {
                resultsDiv.textContent = '请求失败，请重试';
            }
        }
    };

    // 发送请求
    xhr.send();
}
