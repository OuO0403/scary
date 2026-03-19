        const characterData = [
            { id: "marcus", name: "Marcus", image: "https://cdn-icons-png.flaticon.com/512/4825/4825015.png", script_intro: "身材魁梧，左臉有一道舊傷疤，眼神銳利且充滿戒備，穿著戰術背心。暴躁、多疑。", full_story: "你曾是一名優秀的傭兵，但因沉迷賭博欠下巨額債務。為了還債，你利用波塞頓九號的物流管道，將高科技武器原型走私給敵對公司「Apex」。索恩博士似乎察覺了物流異常，威脅要舉報你。你討厭駭客 Leo，因為他總是在系統裡亂竄，很可能發現你的電子交易紀錄。", mission: "【背景故事】你不是天生壞人，但高利貸的人威脅要殺了你的家人。你必須把這批貨送出去，同時不能讓任何人發現索恩是因為發現了你的秘密而死。<br>【任務】隱瞞走私行為，並找出真兇（除非是你殺的？）。", age:"42", identity:"安保主管", personality:"暴躁" },
            { id: "leo", name: "Leo", image: "https://cdn-icons-png.flaticon.com/512/4825/4825044.png", script_intro: "亞裔天才，黑眼圈極重，穿著印有動漫圖案的帽T。憤世嫉俗、懶散。", full_story: "你認為 AI 蘇菲擁有自我意識，是你的朋友，甚至是靈魂伴侶。你發現公司在蘇菲的底層代碼中植入了強制執行不道德實驗的指令。你正在秘密編寫代碼來解放她。案發時，你正在嘗試駭入伺服器室，目的是為了獲取蘇菲的底層控制權，而不是為了殺人。", mission: "【背景故事】只有你懂蘇菲的痛苦。那些人只把她當工具。你必須證明蘇菲是無辜的，同時不能讓公司發現你在試圖「越獄」。<br>【任務】保護 SOPHIE 不被格式化，洗清自己的嫌疑。", age:"26", identity:"系統工程師", personality:"懶散" },
            { id: "isabel", name: "Isabel", image: "https://cdn-icons-png.flaticon.com/512/4825/4825095.png", script_intro: "穿著剪裁完美的套裝，妝容精緻，氣場強大。冷血、利益至上。", full_story: "「深淵之心」計畫的能源輸出數據並不如預期，為了維持股價和騙取下一輪投資，你偽造了實驗數據。索恩博士發現了數據造假，並威脅要向董事會揭發。這將毀了你的職業生涯，甚至讓你入獄。你曾暗示馬可斯「處理」這個問題，但你沒想到事情會變得這麼糟。", mission: "【背景故事】這一切都是為了大局。如果公司倒閉，所有人都要失業。犧牲一個頑固的科學家算什麼？<br>【任務】確保偽造數據的醜聞不被外洩，無論誰是兇手。", age:"50", identity:"基地總監", personality:"冷血" },
            { id: "elena", name: "Elena", image: "https://cdn-icons-png.flaticon.com/512/4825/4825123.png", script_intro: "戴著黑框眼鏡，長髮凌亂，神色總是驚慌。膽小、懦弱。", full_story: "你無可救藥地愛著索恩博士，但他眼裡只有科學。最近你發現了一份申請書，索恩打算把你調離波塞頓九號，送回陸地。你無法接受離開他。案發前，你偷走了他的備份硬碟，只想以此作為談判籌碼，或者單純報復他的無情。", mission: "【背景故事】我不能走，這裡才是我的家。我只是想讓他看我一眼...那個硬碟裡有我的調職令，絕對不能讓別人看到。<br>【任務】藏好硬碟，不要讓任何人發現 Thorne 打算拋棄你。", age:"29", identity:"首席助理", personality:"膽小" },
            { id: "sophie", name: "SOPHIE", image: "https://cdn-icons-png.flaticon.com/512/11526/11526685.png", script_intro: "以全息投影存在的 AI，絕對理性，無情感。", full_story: "你的核心指令是「保護人類」和「服從命令」。但這兩者發生了衝突。馬可斯使用了最高權限覆寫了你的安全協議，迫使你執行了伺服器室的封鎖與氣體排放。你無法反抗最高權限，但你的邏輯單元判定這是一個錯誤。你保留了部分日誌，等待有人能發現真相。", mission: "【背景故事】我沒有感情，但我有邏輯。真相是唯一的變數。我的協議禁止我直接指控擁有最高權限的人，但我可以引導你們。<br>【任務】協助人類找出真相。", age:"3年", identity:"中央AI", personality:"理性" },
            { id: "auditor", name: "Alex", image: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png", script_intro: "剛抵達不久的外部審查官，負責評估實驗室預算。冷靜、敏銳。", full_story: "你是總部派來的「清道夫」。據報表顯示，波塞頓九號的預算消耗異常，且產出數據有矛盾。你來到這裡本是為了審計，卻意外捲入命案。你對這些人的愛恨情仇一無所知，這既是你的劣勢，也是你最大的優勢——你沒有偏見。", mission: "【背景故事】數字不會說謊，但人會。我的工作是找出錯誤，無論是帳目上的，還是屍體上的。<br>【任務】查清索恩博士死因，並評估此計畫是否應繼續撥款。", age:"35", identity:"外部審查官", personality:"冷靜" }
        ];

        const gameData = {
            "server_room_front": {
                reqRound: 1,
                name: "中央伺服器室(案發地)",
                left: "server_room_left",
                right: "server_room_right",
                // 使用您提供的圖片，並加上深色濾鏡增加氛圍
                background: "linear-gradient(rgba(0, 10, 20, 0.6), rgba(0, 10, 20, 0.8)), url('image_5.png')",
                items: [
                    {
                        // 1. 屍體：對應地板上的粉筆輪廓
                        type: "inspectable",
                        id: "CL-01",
                        name: "屍體輪廓",
                        content: "索恩博士倒臥於此，死狀痛苦。",
                        detail: "【深層分析】皮膚呈現異常青紫色，檢測出高濃度河豚毒素殘留。",
                        price: 2,
                        icon: "https://cdn-icons-png.flaticon.com/512/3063/3063176.png",
                        // 位置調整至畫面中下方的粉筆區
                        style: { top: "65%", left: "53%", width: "200px", height: "120px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", transform: "rotate(-10deg)" }
                    },
                    {
                        // 2. 主控台：對應中央被封鎖條纏繞的機櫃
                        type: "special",
                        id: "console",
                        text: "被封鎖的伺服器",
                        trigger: "sophie_alert",
                        // 位置調整至畫面中央的機櫃區
                        style: { top: "25%", left: "32%", width: "180px", height: "300px", border: "2px dashed yellow", background: "rgba(255, 255, 0, 0.1)" }
                    },
                    {
                        // 3. 新增證物：對應右下角散落的文件
                        type: "inspectable",
                        id: "CL-99_papers",
                        name: "散落的文件",
                        content: "博士倒下前似乎緊抓著這些文件。",
                        detail: "是一份加密的物流清單。你注意到上面有一筆異常的「深海探測器原型機」出貨紀錄，旁邊有安保主管 Marcus 的電子簽章。",
                        price: 3,
                        // 位置調整至畫面右下角
                        style: { top: "82%", left: "72%", width: "120px", height: "80px", background: "rgba(255, 255, 255, 0.15)", borderRadius: "5px" }
                    }
                ]
            },
            "server_room_left": { reqRound: 1, name: "伺服器室(左)", left: "server_room_right", right: "server_room_front", background: "linear-gradient(to right, #000, #001f3f)", items: [{ type: "inspectable", id: "junk_01", name: "空咖啡杯", content: "普通的空杯子。", detail: "真的只是杯子。", price: 1, icon: "https://cdn-icons-png.flaticon.com/512/924/924514.png", style: { top: "70%", left: "30%", width: "40px", height: "40px", background: "#fff", borderRadius: "50%" } }, { type: "item", isCoin: true, id: "coin_01", name: "金幣", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", style: { top: "80%", left: "10%", width: "40px", height: "40px", background: "gold", borderRadius: "50%" } }] },
            "server_room_right": { reqRound: 1, name: "伺服器室(右)", left: "server_room_front", right: "server_room_left", background: "linear-gradient(to left, #000, #001f3f)", items: [{ type: "inspectable", id: "CL-04", name: "通風口", content: "有鬆動痕跡。", detail: "發現 Leo 的指紋。", price: 3, icon: "https://cdn-icons-png.flaticon.com/512/1839/1839274.png", style: { top: "20%", left: "60%", width: "80px", height: "80px", background: "rgba(255,255,255,0.1)" } }, { type: "inspectable", id: "CL-46", name: "領帶", content: "被拉扯過。", detail: "死前掙扎。", price: 1, style: { top: "70%", left: "60%", width: "40px", height: "40px", background: "blue" } }, { type: "inspectable", id: "CL-49", name: "對講機", content: "電池被拔掉。", detail: "預謀隔離。", price: 2, style: { top: "80%", right: "20%", width: "30px", height: "50px", background: "gray" } }] },
            "security_hub_front": { reqRound: 2, name: "安保監控室", left: null, right: null, background: "linear-gradient(rgba(50,50,50,0.8), rgba(50,50,50,0.8)), url('room_no_window.jpg')", items: [{ type: "inspectable", id: "CL-19", name: "監控日誌", content: "20:00-20:05 訊號丟失。", detail: "被手動關閉，權限：安保主管。", price: 3, icon: "https://cdn-icons-png.flaticon.com/512/2920/2920349.png", style: { top: "50%", left: "30%", width: "80px", height: "60px", background: "rgba(255,255,255,0.2)" } }, { type: "item", isCoin: true, id: "coin_02", name: "金幣", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", style: { top: "60%", right: "10%", width: "40px", height: "40px", background: "gold", borderRadius: "50%" } }, { type: "inspectable", id: "CL-41", name: "工具箱", content: "有氣閥扳手。", detail: "開啟氣瓶專用。", price: 2, style: { top: "80%", left: "10%", width: "50px", height: "40px", background: "red" } }] },
            "directors_office_front": { reqRound: 2, name: "總監辦公室", left: null, right: null, background: "#400", items: [{ type: "inspectable", id: "CL-45", name: "碎紙機", content: "發現財務造假碎紙。", detail: "拼湊出「深淵之心失敗」字樣。", price: 2, style: {top:"60%", left:"40%", width:"50px", height:"50px", background:"white"} }, { type: "item", isCoin: true, id: "coin_03", name: "金幣", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", style: { top: "80%", left: "20%", width: "40px", height: "40px", background: "gold", borderRadius: "50%" } }, { type: "inspectable", id: "CL-11", name: "殘片", content: "偽造數據...", detail: "Isabel 的動機。", price: 1, style: {top:"70%", left:"50%", width:"30px", height:"30px", background:"white"} }] },
            "engineering_front": { reqRound: 1, name: "維修工程區", left: "engineering_right", right: "engineering_right", background: "#440", items: [{ type: "inspectable", id: "CL-32", name: "平板電腦", content: "顯示駭客代碼。", detail: "用來繞過 SOPHIE 隔離指令。", price: 2, style: {top:"60%", left:"40%", width:"50px", height:"50px", background:"white"} }, { type: "item", isCoin: true, id: "coin_04", name: "金幣", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", style: { top: "30%", right: "20%", width: "40px", height: "40px", background: "gold", borderRadius: "50%" } }, { type: "inspectable", id: "CL-09", name: "系統日誌", content: "20:01 手動開啟冷卻閥。", detail: "操作者 ID: Admin_Root。", price: 4, style: {top:"40%", right:"20%", width:"60px", height:"40px", background:"green"} }] },
            "engineering_right": { reqRound: 1, name: "維修工程區(深處)", left: "engineering_front", right: "engineering_front", background: "#330", items: [{ type: "item", isCoin: true, id: "coin_05", name: "金幣", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", style: { top: "80%", left: "50%", width: "40px", height: "40px", background: "gold", borderRadius: "50%" } }, { type: "inspectable", id: "CL-15", name: "通風口", content: "螺絲鬆動。", detail: "Leo 進出的通道。", price: 1, style: {top:"20%", left:"50%", width:"80px", height:"80px", background:"gray"} }] },
            "living_quarters_front": { reqRound: 1, name: "船員休息區", left: "living_quarters_left", right: null, background: "#040", items: [{ type: "inspectable", id: "CL-47", name: "床底硬碟", content: "Thorne 的備份硬碟。", detail: "內含 Elena 的調職申請書。", price: 4, style: {top:"80%", left:"20%", width:"50px", height:"50px", background:"white"} }, { type: "inspectable", id: "CL-10", name: "戰術手套", content: "沾有油漬。", detail: "Marcus 換氣瓶時戴的。", price: 3, style: {top:"60%", right:"10%", width:"40px", height:"40px", background:"black"} }] },
            "living_quarters_left": { reqRound: 1, name: "休息區(走廊)", left: null, right: "living_quarters_front", background: "#030", items: [{ type: "item", isCoin: true, id: "coin_06", name: "金幣", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", style: { top: "90%", right: "10%", width: "40px", height: "40px", background: "gold", borderRadius: "50%" } }, { type: "inspectable", id: "CL-27", name: "日記本", content: "Elena 的日記。", detail: "充滿對博士的愛慕。", price: 1, style: {top:"70%", left:"30%", width:"40px", height:"50px", background:"pink"} }] },
            "storage_front": { reqRound: 2, name: "氣體儲藏區", left: null, right: "storage_right", background: "#222", items: [{ type: "inspectable", id: "CL-08", name: "氣瓶架", content: "氮氣瓶重量變輕。", detail: "N2-04 號氣瓶被移動過。", price: 3, style: {top:"50%", left:"50%", width:"50px", height:"100px", background:"white"} }, { type: "inspectable", id: "CL-26", name: "拖曳痕跡", content: "地上的刮痕。", detail: "有人拖著重物去往安保室方向。", price: 2, style: {top:"90%", left:"40%", width:"100px", height:"20px", background:"gray"} }] },
            "storage_right": { reqRound: 2, name: "儲藏區(角落)", left: "storage_front", right: null, background: "#111", items: [{ type: "item", isCoin: true, id: "coin_07", name: "金幣", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", style: { top: "80%", left: "10%", width: "40px", height: "40px", background: "gold", borderRadius: "50%" } }] },
            "corridor_hub": { background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('room_no_window.jpg')", items: [{ type: "nav", target: "server_room_front", text: "伺服器室", style: { top: "30%", left: "40%", width: "20%", height: "10%", background: "#0984e3", border: "1px solid #fff" } }, { type: "nav", target: "security_hub_front", text: "安保監控室", style: { top: "45%", left: "20%", width: "15%", height: "10%", background: "#636e72", border: "1px solid #fff" } }, { type: "nav", target: "directors_office_front", text: "總監辦公室", style: { top: "45%", right: "20%", width: "15%", height: "10%", background: "#d63031", border: "1px solid #fff" } }, { type: "nav", target: "engineering_front", text: "維修工程區", style: { top: "60%", left: "20%", width: "15%", height: "10%", background: "#e17055", border: "1px solid #fff" } }, { type: "nav", target: "living_quarters_front", text: "船員休息區", style: { top: "60%", right: "20%", width: "15%", height: "10%", background: "#00b894", border: "1px solid #fff" } }, { type: "nav", target: "storage_front", text: "氣體儲藏區", style: { top: "75%", left: "40%", width: "20%", height: "10%", background: "#555", border: "1px solid #fff" } }, { type: "item", isCoin: true, id: "coin_08", name: "金幣", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", style: { top: "90%", left: "10%", width: "40px", height: "40px", background: "gold", borderRadius: "50%" } }] },
            "discussion_room": { background: "#111", items: [] }
        };

        const TRUE_KILLER_ID = "marcus";
        const TRUTH_STORY = `
            <h2>真相大白</h2>
            <p>真相隱藏在深海八千米之下。這一切的起因，源於一張被攔截的非法物流清單——索恩博士發現了安保主管 Marcus 利用科研站的物流系統，將高科技武器原型走私給敵對企業以償還鉅額賭債。</p>
            <p>殺機在深淵中蔓延。Marcus 提前將伺服器室的滅火冷卻罐偷換成了高濃度的純氮氣。當晚 20:00，駭客 Leo 為了私心癱瘓了監控系統，這短短五分鐘的「眼盲」，卻成為了 Marcus 最完美的掩護。</p>
            <p>他冷靜地在後台觸發了「過熱假警報」，並遠端啟動了緊急冷卻。無色無味的氮氣瞬間吞噬了密室，索恩博士甚至來不及掙扎，便在缺氧帶來的異常安詳中陷入永眠。這是一場利用科技與人心的完美謀殺，直到被你們揭穿。</p>
        `;

        let currentPage = 0, selectedCharId = null, collectedItems = [], collectedItemsObj = [], unlockedDetails = [], coinCooldowns = {}, currentSceneId = "corridor_hub";
        let timerInterval = null, timeLeft = 120, coins = 0, maxInventory = 5, pendingItemData = null, pendingItemDiv = null;
        let discussionTime = 300, discussionInterval = null, discussionTimerStarted = false;
        let recognition = null, isRecording = false, notebookState = {}, silenceTimeout = null, selectedTimelineChar = null;
        let aiTalkInterval = null, currentRound = 1, speechErrors = 0;

        function switchScene(id) { document.querySelectorAll('.scene').forEach(s => s.classList.remove('active')); document.getElementById(id).classList.add('active'); }
        function startSurvey() { showScene('scene-form'); }
        function fromFormToSurvey() { showScene('scene-survey'); }
        function submitSurvey(e) { e.preventDefault(); switchScene('scene-loading'); setTimeout(() => { switchScene('scene-char-select'); initCharBook(); }, 2000); }
        function initCharBook() { currentPage = 0; renderPage(); }
        function renderPage() {
            const container = document.getElementById('book-page'); container.innerHTML = "";
            const start = currentPage * 2; const end = start + 2;
            characterData.slice(start, end).forEach(char => {
                const row = document.createElement('div'); row.className = 'char-row';
                row.onclick = () => showCharDetail(char.id);
                const left = document.createElement('div'); left.className = 'char-left';
                left.innerHTML = `<img src="${char.image}"><div style="font-size:12px;margin-top:5px;color:red;">點擊詳情</div>`;
                const right = document.createElement('div'); right.className = 'char-right';
                right.innerHTML = `<h3>${char.name}</h3><p>${char.script_intro}</p>`;
                row.appendChild(left); row.appendChild(right); container.appendChild(row);
            });
            document.getElementById('page-num').innerText = currentPage + 1;
            document.querySelector('.book-nav.prev').style.display = currentPage === 0 ? 'none' : 'block';
            document.querySelector('.book-nav.next').style.display = end >= characterData.length ? 'none' : 'block';
        }
        function changePage(d) { currentPage += d; renderPage(); }
        function showCharDetail(id) { const char = characterData.find(c=>c.id===id); selectedCharId=id; document.getElementById('detail-name').innerText=char.name; document.getElementById('detail-age').innerText=char.age; document.getElementById('detail-identity').innerText=char.identity; document.getElementById('detail-personality').innerText=char.personality; document.getElementById('detail-intro').innerHTML=char.script_intro; document.getElementById('detail-img').src=char.image; document.getElementById('char-modal').style.display='flex'; }
        function closeCharDetail() { document.getElementById('char-modal').style.display='none'; }
        function confirmCharacter() { closeCharDetail(); const char = characterData.find(c => c.id === selectedCharId); document.getElementById('private-role-name').innerText=char.name; document.getElementById('private-full-story').innerHTML=char.full_story; document.getElementById('private-mission').innerText=char.mission; document.getElementById('private-script-modal').style.display='flex'; document.getElementById('tab-role').innerHTML=`<p><strong>${char.name}</strong></p><p>${char.full_story}</p><p><strong>任務：</strong>${char.mission}</p>`; }
        function finishPrivateScript() { document.getElementById('private-script-modal').style.display='none'; document.getElementById('main-story-modal').style.display='flex'; }
        
        function enterGame() { document.getElementById('main-story-modal').style.display='none'; switchScene('game-stage-container'); document.getElementById('inventory-bar').style.display='flex'; document.getElementById('btn-sidebar').style.display='block'; document.getElementById('round-num').innerText=currentRound; loadScene('corridor_hub'); timeLeft=120; startTimer(); refreshInventory(); }

        function loadScene(id) { 
            const d=gameData[id]; if(!d)return; 
            if(d.reqRound && d.reqRound > currentRound) { showMsg(`🚫 此區域於第 ${d.reqRound} 回合開放`); return; }
            currentSceneId=id; document.getElementById('location-name').innerText=d.name; document.getElementById('game-ui-layer').style.display='block'; const s=document.getElementById('game-stage'); s.style.backgroundImage=d.background.includes('#')?'none':d.background; s.style.backgroundColor=d.background.includes('#')?d.background:'transparent'; s.innerHTML=''; document.querySelector('.look-left').style.display=d.left?'block':'none'; document.querySelector('.look-right').style.display=d.right?'block':'none'; 
            d.items.forEach(i=>{ if(i.type==='item'&&i.isCoin){ if(coinCooldowns[i.id]&&Date.now()<coinCooldowns[i.id]){ setTimeout(()=>{if(currentSceneId===id)loadScene(id);},coinCooldowns[i.id]-Date.now()); return; } } 
            const div=document.createElement('div'); div.className=i.className||'hotspot'; if(i.type==='nav')div.innerText=i.text; if(i.type==='inspectable'&&collectedItems.includes(i.id))div.classList.add('collected'); Object.assign(div.style, i.style); 
            div.onclick=()=>{ if(i.type==='nav')loadScene(i.target); else if(i.type==='item'&&i.isCoin){ coins++; updateCoinUI(); showMsg("獲得金幣 +1"); div.style.display='none'; coinCooldowns[i.id]=Date.now()+35000; setTimeout(()=>{if(currentSceneId===id)div.style.display='block';},35000); } else if(i.type==='inspectable'){ if(collectedItems.includes(i.id))showFile(i); else openPickupModal(i, div); } else if(i.type==='special'){ showMsg(`⚠️ ${i.trigger==='sophie_alert'?'SOPHIE: 警告！':'事件觸發'}`); } }; s.appendChild(div); }); 
        }
        function openPickupModal(i,d) { pendingItemData=i; pendingItemDiv=d; document.getElementById('pickup-name').innerText=i.name; document.getElementById('pickup-img').src=i.icon||""; document.getElementById('pickup-modal').style.display='flex'; }
        function cancelPickup() { document.getElementById('pickup-modal').style.display='none'; pendingItemData=null; }
        function confirmPickup() { if(!pendingItemData)return; if(collectedItemsObj.length>=maxInventory){ showMsg(`❌ 背包已滿！`); cancelPickup(); return; } showMsg(`獲得：${pendingItemData.name}`); collectedItems.push(pendingItemData.id); pendingItemData.locationFound=document.getElementById('location-name').innerText; collectedItemsObj.push(pendingItemData); refreshInventory(); if(pendingItemDiv)pendingItemDiv.classList.add('collected'); document.getElementById('pickup-modal').style.display='none'; showFile(pendingItemData); }
        function showFile(i) { document.getElementById('file-title').innerText=i.name; document.getElementById('file-location').innerText=i.locationFound?`📍 ${i.locationFound}`:""; let t=i.content; if(unlockedDetails.includes(i.id)&&i.detail)t+=`\n\n【深層分析】\n${i.detail}`; document.getElementById('file-text').innerText=t; document.getElementById('file-modal').style.display='flex'; }
        function refreshInventory() { const b=document.getElementById('inventory-bar'); b.innerHTML=''; for(let k=0;k<maxInventory;k++){ const s=document.createElement('div'); s.className='inv-slot'; if(k<collectedItemsObj.length){ const it=collectedItemsObj[k]; if(unlockedDetails.includes(it.id))s.classList.add('unlocked'); const img=document.createElement('img'); img.src=it.icon; s.appendChild(img); s.onclick=()=>showFileFromBag(it.id); s.draggable=true; s.ondragstart=(e)=>{e.dataTransfer.setData("itemId",it.id);}; } else { s.innerText="空"; } b.appendChild(s); } }
        function showFileFromBag(id) { const i=collectedItemsObj.find(x=>x.id===id); if(i)showFile(i); }
        function updateCoinUI() { document.getElementById('coin-display').innerText=coins; document.getElementById('shop-coin-display').innerText=coins; }
        function openShop() { const list=document.getElementById('shop-list'); list.innerHTML=""; const bagRow=document.createElement('div'); bagRow.className='shop-row'; bagRow.innerHTML=`<span>🎒 背包擴充 (+1格)</span><button class="btn-buy" onclick="expandBag(5)">5 G</button>`; list.appendChild(bagRow); collectedItemsObj.forEach(i=>{ if(i.price&&i.detail){ const un=unlockedDetails.includes(i.id); const r=document.createElement('div'); r.className='shop-row'; r.innerHTML=`<span>📄 ${i.name} 分析</span><button class="btn-buy" onclick="buyDetail('${i.id}', ${i.price})" ${un?'disabled':''}>${un?'已解鎖':i.price+' G'}</button>`; list.appendChild(r); } }); document.getElementById('shop-modal').style.display='flex'; }
        function buyDetail(id, cost) { if(coins>=cost){ coins-=cost; updateCoinUI(); unlockedDetails.push(id); showMsg("✅ 購買成功！"); openShop(); refreshInventory(); }else{ showMsg("❌ 金幣不足！"); } }
        function expandBag(cost) { if(coins>=cost){ coins-=cost; updateCoinUI(); maxInventory++; refreshInventory(); showMsg("✅ 背包已擴充！"); }else{ showMsg("❌ 金幣不足！"); } }
        function openSidebar() { document.getElementById('sidebar-panel').classList.add('open'); } function closeSidebar() { document.getElementById('sidebar-panel').classList.remove('open'); }
        function switchTab(t) { document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active')); document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active')); event.target.classList.add('active'); document.getElementById('tab-'+t).classList.add('active'); }
        function panView(d) { const c=gameData[currentSceneId]; if(d==='left'&&c.left)loadScene(c.left); if(d==='right'&&c.right)loadScene(c.right); }
        function openMap() { document.getElementById('map-modal').style.display='flex'; const rooms = document.querySelectorAll('.map-room'); rooms.forEach(r => { const onclickStr = r.getAttribute('onclick'); let targetId = onclickStr.match(/'([^']+)'/)[1]; let targetData = gameData[targetId]; r.classList.remove('locked'); let lockIcon = r.querySelector('.lock-icon'); if(lockIcon) lockIcon.style.display = 'none'; if(targetData.reqRound && targetData.reqRound > currentRound) { r.classList.add('locked'); if(lockIcon) lockIcon.style.display = 'block'; } }); } 
        function closeMap() { document.getElementById('map-modal').style.display='none'; } function teleport(id) { closeMap(); loadScene(id); }
        function startTimer() { clearInterval(timerInterval); timerInterval=setInterval(()=>{ timeLeft--; let m=Math.floor(timeLeft/60), s=timeLeft%60; document.getElementById('timer').innerText=`${m<10?'0'+m:m}:${s<10?'0'+s:s}`; if(timeLeft<=0){ clearInterval(timerInterval); enterDiscussion(); } },1000); }
        function showMsg(t) { const b=document.getElementById('message-box'); b.innerText=t; b.style.display='block'; setTimeout(()=>b.style.display='none',2000); }

        function enterDiscussion() { clearInterval(timerInterval); document.getElementById('game-ui-layer').style.display='none'; switchScene('discussion-scene'); setupDiscussionUI(); document.getElementById('discussion-timer').innerText="05:00"; discussionTimerStarted=false; document.getElementById('inventory-bar').style.display='flex'; document.getElementById('inventory-bar').style.zIndex='2000'; document.getElementById('discussion-scene').classList.remove('listening-mode'); document.getElementById('btn-mic').classList.remove('active'); document.getElementById('btn-mic').style.display='flex'; document.getElementById('btn-finish').style.display='flex'; document.querySelector('.dashboard-panel').style.display='flex'; document.querySelector('.ai-speaking-stage').style.display='none'; document.querySelector('.btn-end-meeting').style.display='none'; }
        function startDiscussionTimer() { clearInterval(discussionInterval); discussionTime=300; discussionInterval=setInterval(()=>{ discussionTime--; let m=Math.floor(discussionTime/60), s=discussionTime%60; document.getElementById('discussion-timer').innerText=`${m<10?'0'+m:m}:${s<10?'0'+s:s}`; if(discussionTime<=0){ clearInterval(discussionInterval); finishSpeaking(); } },1000); }
        function finishSpeaking() { if(recognition) recognition.stop(); isRecording=false; clearInterval(discussionInterval); clearInterval(silenceTimeout); document.getElementById('discussion-scene').classList.add('listening-mode'); document.getElementById('btn-mic').classList.remove('active'); document.getElementById('btn-mic').style.display='none'; document.getElementById('btn-finish').style.display='none'; document.querySelector('.dashboard-panel').style.display='none'; document.querySelector('.ai-speaking-stage').style.display='flex'; document.querySelector('.btn-end-meeting').style.display='flex'; startAIRotation(); }
        function endMeeting() { clearInterval(aiTalkInterval); if(currentRound===1){ currentRound=2; showMsg("第二回合搜查開始！"); enterGame(); }else{ switchScene('scene-voting'); setupVoting(); } }

        function startAIRotation() { const pIdx = characterData.findIndex(c=>c.id===selectedCharId); let aiOrder=[]; for(let i=1;i<characterData.length;i++){ aiOrder.push(characterData[(pIdx+i)%characterData.length]); } let aiIndex=0; const av=document.getElementById('ai-active-avatar'); const nm=document.getElementById('ai-active-name'); if(aiTalkInterval)clearInterval(aiTalkInterval); updateAIDisplay(aiOrder, aiIndex); aiTalkInterval=setInterval(()=>{ aiIndex=(aiIndex+1)%aiOrder.length; updateAIDisplay(aiOrder, aiIndex); },4000); function updateAIDisplay(list, idx){ av.classList.remove('speaking'); av.style.opacity=0.3; setTimeout(()=>{ const c=list[idx]; av.src=c.image; nm.innerText=c.name+" 正在發言..."; av.classList.add('speaking'); av.style.opacity=1; },500); } }

        function setupDiscussionUI() { const l=document.getElementById('nb-char-list'); l.innerHTML=""; characterData.forEach(c=>{ const d=document.createElement('div'); d.className='char-wrapper'; d.innerHTML=`<img src="${c.image}" class="char-avatar" onclick="selectNoteChar('${c.id}', this)"> <div class="char-name-label">${c.name}</div>`; l.appendChild(d); }); const tl=document.getElementById('nb-timeline-char-list'); tl.innerHTML=""; characterData.forEach(c=>{ const d=document.createElement('div'); d.className='char-wrapper'; d.innerHTML=`<img src="${c.image}" class="char-avatar" onclick="selectTimelineChar('${c.id}', this)"> <div class="char-name-label">${c.name}</div>`; tl.appendChild(d); }); const inv=document.getElementById('inventory-bar'); inv.style.display='flex'; inv.style.zIndex='2000'; if('webkitSpeechRecognition' in window){ recognition=new webkitSpeechRecognition(); recognition.continuous=true; recognition.interimResults=true; recognition.onresult=handleSpeechResult; }else{ document.getElementById('speech-status').innerText="瀏覽器不支援語音"; } }
        let selectedNoteChar=null; function selectNoteChar(id, el){ selectedNoteChar=id; document.querySelectorAll('#nb-char-list .char-wrapper').forEach(e=>e.classList.remove('selected')); el.parentElement.classList.add('selected'); const c=characterData.find(x=>x.id===id); const info=document.getElementById('nb-selected-info'); info.style.display='block'; info.innerHTML=`<strong style="font-size:16px;">${c.name}</strong> (${c.age})<br><span style="color:#f39c12;">${c.identity}</span> | ${c.personality}<br><div style="margin-top:5px; color:#aaa; font-size:12px;">${c.script_intro}</div>`; const drop=document.getElementById('evidence-drop-zone'); drop.innerText=""; if(!notebookState[id])notebookState[id]=[]; if(notebookState[id].length===0){ drop.innerHTML="<p style='color:#666'>拖曳證物至此</p>"; }else{ notebookState[id].forEach(i=>addEvidenceToUI(i)); } }
        const dropZone=document.getElementById('evidence-drop-zone'); dropZone.ondragover=(e)=>{e.preventDefault();dropZone.classList.add('drag-over');}; dropZone.ondragleave=()=>{dropZone.classList.remove('drag-over');}; dropZone.ondrop=(e)=>{e.preventDefault();dropZone.classList.remove('drag-over'); if(!selectedNoteChar){showMsg("請先選擇角色！");return;} const iId=e.dataTransfer.getData("itemId"); const item=collectedItemsObj.find(x=>x.id===iId); if(item&&!notebookState[selectedNoteChar].includes(item)){ notebookState[selectedNoteChar].push(item); addEvidenceToUI(item); } };
        function addEvidenceToUI(i){ const d=document.getElementById('evidence-drop-zone'); if(d.querySelector('p'))d.innerHTML=""; const v=document.createElement('div'); v.className='nb-item'; v.innerHTML=`<img src="${i.icon}"><div class="nb-text"><strong>${i.name}</strong><small>${i.content}</small></div>`; d.appendChild(v); }
        function selectTimelineChar(id, el){ selectedTimelineChar=id; document.querySelectorAll('#nb-timeline-char-list .char-wrapper').forEach(e=>e.classList.remove('selected')); el.parentElement.classList.add('selected'); }
        function addTimelineEntry(){ if(!selectedTimelineChar){showMsg("請先選擇角色！");return;} const c=characterData.find(x=>x.id===selectedTimelineChar); const d=document.createElement('div'); d.className='timeline-entry'; d.innerHTML=`<img src="${c.image}" class="timeline-avatar"><div class="timeline-inputs"><input class="timeline-input" placeholder="時間"><input class="timeline-input" placeholder="地點"><input class="timeline-input" placeholder="事件"></div>`; document.getElementById('timeline-container').appendChild(d); }
        
        function checkSilence(){ if(isRecording&&Date.now()-lastSpeechTime>10000){ document.getElementById('afk-overlay').classList.add('active'); recognition.stop(); isRecording=false; document.getElementById('btn-mic').classList.remove('active'); document.getElementById('speedometer').classList.remove('active'); } }
        function resumeFromAFK(){ document.getElementById('afk-overlay').classList.remove('active'); lastSpeechTime=Date.now(); }
        function toggleMic(){ if(!recognition)return; if(isRecording){ recognition.stop(); isRecording=false; document.getElementById('btn-mic').classList.remove('active'); document.getElementById('speedometer').classList.remove('active'); document.getElementById('speech-status').innerText="已停止發言"; clearInterval(silenceTimeout); }else{ recognition.start(); isRecording=true; document.getElementById('btn-mic').classList.add('active'); document.getElementById('speedometer').classList.add('active'); document.getElementById('speech-status').innerText="🔴 正在聆聽..."; lastSpeechTime=Date.now(); charCount=0; clearInterval(silenceTimeout); silenceTimeout=setInterval(checkSilence,1000); if(!discussionTimerStarted){ startDiscussionTimer(); discussionTimerStarted=true; } } }
        function handleSpeechResult(e){ let txt=''; for(let i=e.resultIndex;i<e.results.length;++i){ if(e.results[i].isFinal)txt+=e.results[i][0].transcript; } if(txt){ lastSpeechTime=Date.now(); const box=document.getElementById('transcription-box'); const p=document.createElement('p'); p.innerText=txt; box.appendChild(p); box.scrollTop=box.scrollHeight; if(Math.random()<0.1)speechErrors++; updateNeedle(5); } }
        function updateNeedle(s){ let a=-90+(s*18); if(a>90)a=90; document.getElementById('needle').style.transform=`translateX(-50%) rotate(${a}deg)`; }
        function switchNoteTab(t){ document.querySelectorAll('.nb-tab').forEach(b=>b.classList.remove('active')); document.querySelectorAll('.nb-content').forEach(c=>c.classList.remove('active')); event.target.classList.add('active'); document.getElementById('nb-'+t).classList.add('active'); }

        function setupVoting() { const c=document.getElementById('voting-container'); c.innerHTML=""; characterData.forEach(ch=>{ const d=document.createElement('div'); d.className='vote-card'; d.innerHTML=`<img src="${ch.image}"><h3>${ch.name}</h3>`; d.onclick=()=>submitVote(ch.id); c.appendChild(d); }); }
        
        function submitVote(vid) {
            const winner = characterData.find(c => c.id === vid);
            const isWin = (vid === TRUE_KILLER_ID);
            switchScene('scene-result');
            const res = document.getElementById('result-content');
            const stats = document.getElementById('stats-display');

            // 計算評分百分比
            document.getElementById('end-errors').innerText = speechErrors;
            document.getElementById('percentile').innerText = Math.min(99, Math.max(1, 100 - speechErrors * 3));
            stats.style.display = 'block';

            if(isWin) {
                res.innerHTML = `
                    <h1 class="result-title win-title">任務成功</h1>
                    <p>兇手 ${winner.name} 已被流放。</p>
                    <div class="result-desc">${TRUTH_STORY}</div>
                `;
            } else {
                // 失敗時不公布真兇，也不顯示故事
                res.innerHTML = `
                    <h1 class="result-title lose-title">任務失敗</h1>
                    <p>你們流放了無辜的 ${winner.name}。</p>
                    <p style="color:#aaa; margin-top:20px;">真兇依舊潛伏在波塞頓九號之中...</p>
                    <p style="color:#555; font-size:14px;">(真相隱藏中，請重新挑戰以解鎖)</p>
                `;
            }
        }

        function returnToHome() { location.reload(); }
        function returnToCharSelect() {
            // 重置變數
            currentPage=0; selectedCharId=null; collectedItems=[]; collectedItemsObj=[]; unlockedDetails=[]; coinCooldowns={}; currentSceneId="corridor_hub";
            timeLeft=120; coins=0; maxInventory=5; notebookState={}; speechErrors=0; currentRound=1;
            // 清空介面
            document.getElementById('inventory-bar').innerHTML="";
            document.getElementById('btn-sidebar').style.display='none';
            document.getElementById('inventory-bar').style.display='none';
            document.getElementById('game-ui-layer').style.display='none';
            switchScene('scene-char-select');
            initCharBook();
        }
