function getbusinfo(){
        const stationName = document.getElementById("busStation").value; 
        const resultsDiv = document.getElementById('busresults');
        const resultsDiv1 = document.getElementById('busresults1');
        if (!stationName){
            resultsDiv.textContent='';
            return;
        }
    
        // create XMLHttpRequest
       const xhr = new XMLHttpRequest();
       var apiUrl =`https://apis.data.go.kr/6410000/busstationservice/getBusStationList?serviceKey=CnXZihHJKsf9uJEqZze%2BfQCVDUzrJQ6P1VPPWf4ZLNqaHFng1OE3QyBqZojz4uFavJY5VV8qIDdRe%2BO1Z7yg%2Fg%3D%3D&keyword=${stationName}`;
        xhr.open('GET', apiUrl, true);
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { 
                if (xhr.status === 200) { 
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');
                    const items = xmlDoc.getElementsByTagName('busStationList'); // real lable name 
                    const stationId1 = items[0].getElementsByTagName('stationId')[0].textContent;
                    const stationId2= items[1].getElementsByTagName('stationId')[0].textContent;
                    const mobileNo1 = items[0].getElementsByTagName('mobileNo')[0].textContent;
                    const zeroLine = document.createElement('p');
                    zeroLine.textContent = `'정류소 ID:'${mobileNo1}`;
                    resultsDiv.appendChild(zeroLine);

                    const xhr1 = new XMLHttpRequest();
                    //let apiurl;
                    const apikey = 'CnXZihHJKsf9uJEqZze%2BfQCVDUzrJQ6P1VPPWf4ZLNqaHFng1OE3QyBqZojz4uFavJY5VV8qIDdRe%2BO1Z7yg%2Fg%3D%3D';
                    const apiurl = `http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList?serviceKey=${apikey}&stationId=${stationId1}`;

                    xhr1.open('GET', apiurl, true);

                    xhr1.onreadystatechange = function () {
                        if (xhr1.readyState === 4) { 
                            if (xhr1.status === 200) {
                                const parser1 = new DOMParser();
                                const xmlDoc1 = parser1.parseFromString(xhr1.responseText, 'text/xml');
                                const items1 = xmlDoc1.getElementsByTagName('busArrivalList'); // real lable name
                                if (items1.length > 0) {
                                    for (let i = 0; i < items1.length; i++) {
                                        const predictTime1 = items1[i].getElementsByTagName('predictTime1')[0].textContent;
                                        const routeId = items1[i].getElementsByTagName('routeId')[0].textContent;
                                        const xhr2 = new XMLHttpRequest();
                    var apiurl1 = `https://apis.data.go.kr/6410000/busrouteservice/getBusRouteInfoItem?serviceKey=CnXZihHJKsf9uJEqZze%2BfQCVDUzrJQ6P1VPPWf4ZLNqaHFng1OE3QyBqZojz4uFavJY5VV8qIDdRe%2BO1Z7yg%2Fg%3D%3D&routeId=${routeId}`;
                    xhr2.open('GET', apiurl1, true);
          
                    xhr2.onreadystatechange = function () {
                        if (xhr2.readyState === 4) { 
                            if (xhr2.status === 200) {
                                
                                const parser2 = new DOMParser();
                                const xmlDoc2 = parser2.parseFromString(xhr2.responseText, 'text/xml');
                                const items2 = xmlDoc2.getElementsByTagName('busRouteInfoItem'); 
                                        const routeName = items2[0].getElementsByTagName('routeName')[0].textContent;
                                        const startStationName = items2[0].getElementsByTagName('startStationName')[0].textContent;
                                        const endStationName  = items2[0].getElementsByTagName('endStationName')[0].textContent;
    
                                        //const busInfo = document.createElement('p');
                                        //busInfo.textContent = `${routeName}, ${startStationName},<  > ${endStationName},예상도착시간:${predictTime1} 분`;
                                        //resultsDiv.appendChild(busInfo);
                                        const firstLine = document.createElement('p');
                                        firstLine.textContent = `${routeName} ${startStationName} <  > ${endStationName}`;
                                        resultsDiv.appendChild(firstLine);
    
                                        const secondLine = document.createElement('p');
                                        secondLine.textContent = `예상도착시간:${predictTime1} 분`;
                                        resultsDiv.appendChild(secondLine);

                            }else{
                                resultsDiv.textContent = 'API 연결실패';
                            }
                        }
                    };
                    xhr2.send();
                                    }
                                }
                            }else{
                                resultsDiv.textContent = 'API 연결실패';
                            }
                        }
                    };
                    xhr1.send();        

                    
                }else {
                    resultsDiv.textContent = 'API 연결실패';
                }
            }

            
        };
    
        // 发送请求
        xhr.send();
        const xhr4 = new XMLHttpRequest();
        var apiUrl =`https://apis.data.go.kr/6410000/busstationservice/getBusStationList?serviceKey=CnXZihHJKsf9uJEqZze%2BfQCVDUzrJQ6P1VPPWf4ZLNqaHFng1OE3QyBqZojz4uFavJY5VV8qIDdRe%2BO1Z7yg%2Fg%3D%3D&keyword=${stationName}`;
        xhr4.open('GET', apiUrl, true);
        xhr4.onreadystatechange = function () {
            if (xhr4.readyState === 4) { 
                if (xhr4.status === 200) { 
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');
                    const items = xmlDoc.getElementsByTagName('busStationList'); // real lable name 
                    const stationId1 = items[0].getElementsByTagName('stationId')[0].textContent;
                    const stationId2= items[1].getElementsByTagName('stationId')[0].textContent;
                    const mobileNo1 = items[0].getElementsByTagName('mobileNo')[0].textContent;
                    const mobileNo2 = items[1].getElementsByTagName('mobileNo')[0].textContent;
                    const zeroLine = document.createElement('p');
                    zeroLine.textContent = `'정류소 ID:'${mobileNo2}`;
                    resultsDiv1.appendChild(zeroLine);
                    const xhr1 = new XMLHttpRequest();
                    //let apiurl;
                    const apikey = 'CnXZihHJKsf9uJEqZze%2BfQCVDUzrJQ6P1VPPWf4ZLNqaHFng1OE3QyBqZojz4uFavJY5VV8qIDdRe%2BO1Z7yg%2Fg%3D%3D';
                    const apiurl = `http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList?serviceKey=${apikey}&stationId=${stationId2}`;

                    xhr1.open('GET', apiurl, true);

                    xhr1.onreadystatechange = function () {
                        if (xhr1.readyState === 4) { 
                            if (xhr1.status === 200) {
                                const parser1 = new DOMParser();
                                const xmlDoc1 = parser1.parseFromString(xhr1.responseText, 'text/xml');
                                const items1 = xmlDoc1.getElementsByTagName('busArrivalList'); // real lable name
                                if (items1.length > 0) {
                                    for (let i = 0; i < items1.length; i++) {
                                        const predictTime1 = items1[i].getElementsByTagName('predictTime1')[0].textContent;
                                        const routeId = items1[i].getElementsByTagName('routeId')[0].textContent;
                                        const xhr2 = new XMLHttpRequest();
                    var apiurl1 = `https://apis.data.go.kr/6410000/busrouteservice/getBusRouteInfoItem?serviceKey=CnXZihHJKsf9uJEqZze%2BfQCVDUzrJQ6P1VPPWf4ZLNqaHFng1OE3QyBqZojz4uFavJY5VV8qIDdRe%2BO1Z7yg%2Fg%3D%3D&routeId=${routeId}`;
                    xhr2.open('GET', apiurl1, true);
          
                    xhr2.onreadystatechange = function () {
                        if (xhr2.readyState === 4) { 
                            if (xhr2.status === 200) {
                                
                                const parser2 = new DOMParser();
                                const xmlDoc2 = parser2.parseFromString(xhr2.responseText, 'text/xml');
                                const items2 = xmlDoc2.getElementsByTagName('busRouteInfoItem'); 
                                        const routeName = items2[0].getElementsByTagName('routeName')[0].textContent;
                                        const startStationName = items2[0].getElementsByTagName('startStationName')[0].textContent;
                                        const endStationName  = items2[0].getElementsByTagName('endStationName')[0].textContent;
    
                                        //const busInfo = document.createElement('p');
                                        //busInfo.textContent = `${routeName}, ${startStationName},<  > ${endStationName},예상도착시간:${predictTime1} 분`;
                                        //resultsDiv.appendChild(busInfo);
                                        const firstLine = document.createElement('p');
                                        firstLine.textContent = `${routeName} ${startStationName} <  > ${endStationName}`;
                                        resultsDiv1.appendChild(firstLine);
    
                                        const secondLine = document.createElement('p');
                                        secondLine.textContent = `예상도착시간:${predictTime1} 분`;
                                        resultsDiv1.appendChild(secondLine);

                            }else{
                                resultsDiv.textContent = 'API 연결실패';
                            }
                        }
                    };
                    xhr2.send();
                                    }
                                }
                            }else{
                                resultsDiv.textContent = 'API 연결실패';
                            }
                        }
                    };
                    xhr1.send();        

                    
                }else {
                    resultsDiv.textContent = 'API 연결실패';
                }
            }

            
        };
    
        // 发送请求
        xhr4.send();
    }
    