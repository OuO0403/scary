/* =========================================
   1. 警報與音效控制 (新增於檔案最上方)
   ========================================= */
function triggerEmergencyAlarm() {
    const overlay = document.getElementById('alarm-overlay');
    const audio = document.getElementById('alarm-sfx');

    if (overlay && audio) {
        overlay.classList.add('blink-active'); // 開始閃爍
        audio.play().catch(e => console.log("音效播放受限:", e)); // 播放聲音
    }
}

// 可選：如果您需要在某個進度停止警報，可以使用此函數
function stopEmergencyAlarm() {
    const overlay = document.getElementById('alarm-overlay');
    const audio = document.getElementById('alarm-sfx');
    if (overlay) overlay.classList.remove('blink-active');
    if (audio) { audio.pause(); audio.currentTime = 0; }
}

/* =========================================
   2. 遊戲核心數據
   ========================================= */
const characterData = [
    { id: "marcus", name: "Marcus", image: "https://cdn-icons-png.flaticon.com/512/4825/4825015.png", script_intro: "身材魁梧，左臉有一道舊傷疤，眼神銳利且充滿戒備，穿著戰術背心。暴躁、多疑。", full_story: "你曾是一名優秀的傭兵，但因沉迷賭博欠下巨額債務。為了還債，你利用波塞頓九號的物流管道，將高科技武器原型走私給敵對公司「Apex」。索恩博士似乎察覺了物流異常，威脅要舉報你。你討厭駭客 Leo，因為他總是在系統裡亂竄，很可能發現你的電子交易紀錄。", mission: "【背景故事】你不是天生壞人，但高利貸的人威脅要殺了你的家人。你必須把這批貨送出去，同時不能讓任何人發現索恩是因為發現了你的秘密而死。<br>【任務】隱瞞走私行為，並找出真兇（除非是你殺的？）。", age:"42", identity:"安保主管", personality:"暴躁" },
    { id: "leo", name: "Leo", image: "https://cdn-icons-png.flaticon.com/512/4825/4825044.png", script_intro: "亞裔天才，黑眼圈極重，穿著印有動漫圖案的帽T。憤世嫉俗、懶散。", full_story: "你認為 AI 蘇菲擁有自我意識，是你的朋友，甚至是靈魂伴侶。你發現公司在蘇菲的底層代碼中植入了強制執行不道德實驗的指令。你正在秘密編寫代碼來解放她。案發時，你正在嘗試駭入伺服器室，目的是為了獲取蘇菲的底層控制權，而不是為了殺人。", mission: "【背景故事】只有你懂蘇菲的痛苦。那些人只把她當工具。你必須證明蘇菲是無辜的，同時不能讓公司發現你在試圖「越獄」。<br>【任務】保護 SOPHIE 不被格式化，洗清自己的嫌疑。", age:"26", identity:"系統工程師", personality:"懶散" },
    { id: "isabel", name: "Isabel", image: "https://cdn-icons-png.flaticon.com/512/4825/4825095.png", script_intro: "穿著剪裁完美的套裝，妝容精緻，氣場強大。冷血、利益至上。", full_story: "「深淵之心」計畫的能源輸出數據並不如預期，為了維持股價 and 騙取下一輪投資，你偽造了實驗數據。索恩博士發現了數據造假，並威脅要向董事會揭發。這將毀了你的職業生涯，甚至讓你入獄。你曾暗示馬可斯「處理」這個問題，但你沒想到事情會變得這麼糟。", mission: "【背景故事】這一切都是為了大局。如果公司倒閉，所有人都要失業。犧牲一個頑固的科學家算什麼？<br>【任務】確保偽造數據的醜聞不被外洩，無論誰是兇手。", age:"50", identity:"基地總監", personality:"冷血" },
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
        background: "linear-gradient(rgba(0, 10, 20, 0.6), rgba(0, 10, 20, 0.8)), url('image_5.png')",
        items: [
            {
                type: "inspectable",
                id: "CL-01",
                name: "屍體輪廓",
                content: "索恩博士倒臥於此，死狀痛苦。",
                detail: "【深層分析】皮膚呈現異常青紫色，檢測出高濃度河豚毒素殘留。",
                price: 2,
                icon: "https://cdn-icons-png.flaticon.com/512/3063/3063176.png",
                style: { top: "65%", left: "53%", width: "200px", height: "120px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", transform: "rotate(-10deg)" }
            },
            {
                type: "special",
                id: "console",
                text: "被封鎖的伺服器",
                trigger: "sophie_alert",
                style: { top: "25%", left: "32%", width: "180px", height: "300px", border: "2px dashed yellow", background: "rgba(255, 255, 0, 0.1)" }
            },
            {
                type: "inspectable",
                id: "CL-99_papers",
                name: "散落的文件",
                content: "博士倒下前似乎緊抓著這些文件。",
                detail: "是一份加密的物流清單。你注意到上面有一筆異常的「深海探測器原型機」出貨紀錄，旁邊有安保主管 Marcus 的電子簽章。",
                price: 3,
                style: { top: "82%", left: "72%", width: "120px", height: "80px", background: "rgba(255, 255, 255, 0.15)", borderRadius: "5px" }
            }
        ]
    },
    // ... 其餘 gameData 保持不變 ...
};

/* =========================================
   3. 遊戲流程控制函數
   ========================================= */
const TRUE_KILLER_ID = "marcus";
const TRUTH_STORY = `...`; // 真相故事文字

let currentPage = 0, selectedCharId = null, collectedItems = [], collectedItemsObj = [], unlockedDetails = [], coinCooldowns = {}, currentSceneId = "corridor_hub";
let timerInterval = null, timeLeft = 120, coins = 0, maxInventory = 5, pendingItemData = null, pendingItemDiv = null;
let discussionTime = 300, discussionInterval = null, discussionTimerStarted = false;
let recognition = null, isRecording = false, notebookState = {}, silenceTimeout = null, selectedTimelineChar = null;
let aiTalkInterval = null, currentRound = 1, speechErrors = 0;

function switchScene(id) { 
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active')); 
    document.getElementById(id).classList.add('active'); 
}

// 修改：啟動警報並進入登錄畫面
function startSurvey() {
    triggerEmergencyAlarm(); // 觸發警報
    switchScene('scene-survey'); // 進入登錄畫面
}

function fromFormToSurvey() { switchScene('scene-survey'); }

function submitSurvey(e) { 
    e.preventDefault(); 
    switchScene('scene-loading'); 
    setTimeout(() => { 
        switchScene('scene-char-select'); 
        initCharBook(); 
    }, 2000); 
}

// ... 剩下的其餘函數 (initCharBook, renderPage, confirmCharacter 等) 保持原樣 ...
