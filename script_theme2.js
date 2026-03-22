/* === 1. 全域資源宣告 (確保只出現這一次) === */
const bgm = new Audio('https://ouo0403.github.io/oneplusone/assets/MusMus-BGM-031.mp3');
bgm.loop = true;
bgm.volume = 0.3;

const alertSound = new Audio('https://ouo0403.github.io/oneplusone/assets/8footdino_on_scratch-alarm-301729.mp3'); 
alertSound.loop = true;

const sfx = {
    click: new Audio('https://ouo0403.github.io/oneplusone/assets/click..mp3'),
    pickup: new Audio('https://ouo0403.github.io/oneplusone/assets/pickup.mp3'),
    openFile: new Audio('https://ouo0403.github.io/oneplusone/assets/open.mp3'),
    sceneSwap: new Audio('https://ouo0403.github.io/oneplusone/assets/swish.mp3'),
    error: new Audio('https://ouo0403.github.io/oneplusone/assets/error.mp3'),
    win: new Audio('https://ouo0403.github.io/oneplusone/assets/win.mp3'),
    lose: new Audio('https://ouo0403.github.io/oneplusone/assets/lose.mp3')
};

// 輔助播放函式
function playSFX(audio) {
    audio.currentTime = 0;
    audio.play().catch(e => {}); 
}

/* === 2. 遊戲文字內容 === */
const worldIntroText = "2026 年深秋，私立聖德中學封鎖三年的舊教學大樓內，五名師生受神祕信件指引，於校慶深夜重返禁地。三個月前，天才鋼琴少女林曉夢在預演中離奇消失，現場僅遺落一隻滲血舞鞋。隨著大樓門鎖落下，腐朽木香與刺鼻藥劑味交織，牆面血痕漸次浮現，今晚真相若不見光，誰也無法走出這棟被琴聲詛咒的大樓。";

// 基礎場景切換函數
function switchScene(id) { 
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach(s => s.classList.remove('active')); 
    
    const targetScene = document.getElementById(id);
    if (targetScene) {
        targetScene.classList.add('active'); 
    } else {
        console.warn("嘗試切換到不存在的場景 ID: " + id);
    }
}

/* =========================================
   2. 角色與遊戲數據定義
   ========================================= */
const characterData = [
    { 
        id: "C01", 
        name: "沈星河", 
        image: "https://cdn-icons-png.flaticon.com/512/4825/4825015.png", 
        script_intro: "站在頂端的模範生，優雅背後隱藏著崩塌的恐懼。冷靜、控制、名譽。", 
        full_story: "身為聖德中學的學生會會長，你絕對不能允許汙點。三個月前校慶預演當晚，林曉夢在音樂教室拿著你『偽造校長公務印章』以換取保送名額的信件草稿威脅你。爭執中，你失手將她推向鋼琴，她的頭部重擊琴角後倒地。你以為她死了，為了前途，你將她拖入儲藏室企圖掩埋真相。但當你拿著清理工具折返時，屍體竟消失了，只剩下一隻舞鞋。", 
        mission: "【背景故事】你的人生不允許失敗，保送名額是你離開這個破落家庭的唯一機會。<br>【任務】隱瞞偽造印章的行為，確保沒有人發現那晚你在音樂教室，並查出是誰帶走了林曉夢（或屍體）。", 
        age: "18", 
        identity: "學生會會長", 
        personality: "冷靜控視" 
    },
    { 
        id: "C02", 
        name: "陳曼", 
        image: "https://cdn-icons-png.flaticon.com/512/4825/4825044.png", 
        script_intro: "活在天才陰影下的「透明人」，擁有極強的爆發性與扭曲情感。陰沉、自卑、偏執。", 
        full_story: "你是林曉夢的室友，卻恨透了她的耀眼。你長期在她的水杯中混入微量的「強效抗抑鬱藥物」，讓她反應遲鈍、鋼琴水準下滑。失蹤當晚，你發現沈星河慌張離開儲藏室。你進去後發現昏迷的林曉夢，你沒有救她，反而將她藏進了更深的『地基底層』。你噴灑了大量香水來掩蓋那裡的腐臭味與藥味。", 
        mission: "【背景故事】只有看著天才墜落，你才能感受到存在的價值。那個藥瓶還在你身上，絕對不能被發現。<br>【任務】隱瞞下藥的行為，並將嫌疑導向其他對林曉夢有敵意的人。", 
        age: "17", 
        identity: "林曉夢室友", 
        personality: "陰沉自卑" 
    },
    { 
        id: "C03", 
        name: "張毅", 
        image: "https://cdn-icons-png.flaticon.com/512/4825/4825095.png", 
        script_intro: "簡單粗暴的行動派，握有關鍵的物理證據與武力威懾。暴躁、直接、貪財。", 
        full_story: "你因為非法簽賭欠下了高利貸，急需用錢。你發現校長與某建設公司有勾結，正秘密挪用校產。失蹤當晚，你正躲在舊大樓抽菸，意外撞見沈星河在搬運東西。你以此威脅沈星河，向他勒索了五萬元（銀行回條備註：清理多餘的指甲）。你其實不在乎林曉夢的死活，你只在乎能不能拿到剩下的尾款。", 
        mission: "【背景故事】如果拿不到錢，外面債主會打斷你的腿。體育生的前途對你來說早就不重要了。<br>【任務】確保這筆『封口費』的來源不被曝光，並利用你的武力優勢主導搜查。", 
        age: "18", 
        identity: "體育生", 
        personality: "暴躁貪財" 
    },
    { 
        id: "C04", 
        name: "柳青", 
        image: "https://cdn-icons-png.flaticon.com/512/4825/4825123.png", 
        script_intro: "局外人的觀察者視角，負責連結所有線索並進行邏輯診斷。溫柔、敏銳、冷酷。", 
        full_story: "作為新任校醫，你對林曉夢的失蹤有著異樣的執著。事實上，你是林曉夢同父異母的姐姐。你來到這所學校就是為了查明真相。你透過專業手段採集了琴房的血跡樣本，發現與沈星河的生物檢驗結果有細微關聯。你手裡握有林曉夢失蹤前寫給你的求救信，信中提到了對某些人的恐懼。", 
        mission: "【背景故事】你不在乎學校的名譽，你只想讓傷害妹妹的人付出代價。你身上帶著那封關鍵的求救信。<br>【任務】找出殺害或導致林曉夢失蹤的真兇，並在必要時利用醫學知識引導輿論。", 
        age: "26", 
        identity: "新任校醫", 
        personality: "敏銳冷酷" 
    },
    { 
        id: "C05", 
        name: "老秦", 
        image: "https://cdn-icons-png.flaticon.com/512/11526/11526685.png", 
        script_intro: "唯一穿梭於大樓陰暗處的見證者，擁有預言般的瘋話與特殊技能。瘋癲、神祕、酗酒。", 
        full_story: "你是這棟舊大樓的守門人。三個月前的那晚，你喝得爛醉，但你確實聽到了音樂教室傳來的重擊聲，以及隨後清脆的鋼琴聲——那是林曉夢倒下時壓到琴鍵的聲音。你其實目睹了有人在地基附近徘徊，但校長威脅要開除你並撤銷你的退休金，迫使你保持沉默。今晚，你決定用『瘋話』來引導真相。", 
        mission: "【背景故事】這棟大樓有靈魂，林曉夢的琴聲每晚都在迴響。你已經老了，不再害怕威脅。<br>【任務】在不直接違背校長威脅的情況下，透過暗示與瘋言瘋語，引導玩家發現地基底層的暗門。", 
        age: "62", 
        identity: "大樓管理員", 
        personality: "瘋癲神祕" 
    },
];

const gameData = {
    // S1: 音樂教室 - 核心案發地
    "S1": {
        reqRound: 1,
        name: "音樂教室(核心案發地)",
        left: "S1_left",
        right: "S1_right",
        background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('music_room.png')",
        items: [
            { type: "inspectable", id: "CL-01", name: "帶血的鋼琴琴角", content: "三角鋼琴的木質邊緣有一抹乾涸的紅褐色血跡。", detail: "【深層分析】木頭纖維明顯凹陷，說明這曾遭受劇烈撞擊，足以導致當事人瞬間昏迷或顱內出血。血跡中混有極細微的金絲眼鏡鍍層粉末。", price: 2, icon: "https://cdn-icons-png.flaticon.com/512/3063/3063176.png", style: { top: "65%", left: "53%", width: "150px", height: "100px", background: "rgba(255, 0, 0, 0.1)", borderRadius: "10%" } },
            { type: "special", id: "piano_keys", name: "鋼琴內部", trigger: "piano_mystery", style: { top: "25%", left: "32%", width: "180px", height: "150px", border: "2px dashed red", background: "rgba(255, 0, 0, 0.05)" } },
            { type: "inspectable", id: "CL-03", name: "撕碎的推薦信草稿", content: "窗簾後散落著紙張碎屑，隱約可見「沈星河」與「保送」字樣。", detail: "【深層分析】筆跡與沈星河平時草寫一致，且紙張上有噴濺狀血跡，說明撕毀時現場發生過流血事件。", price: 3, style: { top: "82%", left: "72%", width: "120px", height: "80px", background: "rgba(255, 255, 255, 0.15)", borderRadius: "5px" } }
        ]
    },
    "S1_left": { 
        reqRound: 1, 
        name: "音樂教室(左側窗台)", 
        left: "S1_right", 
        right: "S1", 
        background: "linear-gradient(to right, #1a1a1a, #2c3e50)", 
        items: [
            { type: "inspectable", id: "CL-12", name: "斷裂的金絲鏡腿", content: "在鋼琴底座與地毯縫隙間發現的一截金色金屬片。", detail: "該鏡腿雕花與沈星河現戴的眼鏡完全一致。斷裂處夾雜著林曉夢的長髮，證明發生過肢體衝突。", price: 2, style: { top: "85%", left: "45%", width: "40px", height: "10px", background: "#ffd700" } }
        ] 
    },
    "S1_right": { 
        reqRound: 1, 
        name: "音樂教室(鋼琴後方)", 
        left: "S1", 
        right: "S1_left", 
        background: "linear-gradient(to left, #1a1a1a, #2c3e50)", 
        items: [
            { type: "inspectable", id: "CL-06", name: "鋼琴內的魚線", content: "透明的細魚線纏繞在鋼琴高音鍵琴弦上。", detail: "使用了專業的「漁人結」，當按下特定琴鍵時魚線會收緊，意在割傷鋼琴家的手指。這指向了有戶外運動習慣的張毅。", price: 3, style: { top: "30%", left: "50%", width: "60px", height: "60px", background: "rgba(255,255,255,0.2)" } }
        ] 
    },

    // S2: 女生宿舍 302 室
    "S2": { 
        reqRound: 1, 
        name: "女生宿舍 302 室", 
        left: null, 
        right: null, 
        background: "linear-gradient(rgba(30,30,30,0.8), rgba(30,30,30,0.8)), url('dorm.jpg')", 
        items: [
            { type: "inspectable", id: "CL-02", name: "陳曼的藥瓶", content: "標籤破損的強效抗抑鬱藥物，名字被塗改過。", detail: "這藥原是開給林曉夢的。藥瓶幾乎全空，陳曼將其混入食物中，用於維持某人的昏睡狀態。", price: 2, style: { top: "50%", left: "30%", width: "40px", height: "60px", background: "rgba(255,255,255,0.3)" } },
            { type: "inspectable", id: "CL-09", name: "林曉夢的日記頁", content: "水浸過的紙頁寫著：『他連保送都要騙人...』", detail: "提到「罪證」是指學術造假。紙張帶有淡淡福馬林味，說明曾存放在地下密封空間。", price: 3, style: { top: "70%", right: "20%", width: "50px", height: "70px", background: "white" } }
        ] 
    },

    // S3: 舊大樓儲藏室
    "S3": { 
        reqRound: 2, 
        name: "舊大樓儲藏室", 
        left: "S3_inner", 
        right: null, 
        background: "#222", 
        items: [
            { type: "inspectable", id: "CL-08", name: "滲血的芭蕾舞鞋", content: "粉色舞鞋，鞋底沾著暗黃色泥土。", detail: "這種泥土僅存在於地基底層。鞋內留有陳曼常用的香水味，說明失蹤後曾被陳曼穿戴過。", price: 3, style: { top: "80%", left: "40%", width: "60px", height: "40px", background: "pink" } },
            { type: "inspectable", id: "CL-04", name: "牆上的抓痕", content: "門後有一排深淺不一的抓痕，甚至有斷裂指甲。", detail: "抓痕由內向外延伸且高度極低，說明有人曾被關在室內，趴在地上試圖開門。縫隙留有演出服的蕾絲纖維。", price: 2, style: { top: "40%", left: "10%", width: "30px", height: "120px", background: "rgba(0,0,0,0.5)" } }
        ] 
    },
    "S3_inner": { 
        reqRound: 2, 
        name: "儲藏室(通風口深處)", 
        left: null, 
        right: "S3", 
        background: "#111", 
        items: [
            { type: "inspectable", id: "CL-11", name: "腐爛的便當盒", content: "變質的飯菜，生產日期竟然是「上週二」。", detail: "證明林曉夢失蹤三個月後，地下依然有活人在進食。指印與校醫室常用的乳膠手套吻合。", price: 4, style: { top: "70%", left: "50%", width: "80px", height: "50px", background: "white" } }
        ] 
    },

    // S4: 校長辦公室/學生會室
    "S4": { 
        reqRound: 2, 
        name: "校長辦公室/學生會室", 
        left: null, 
        right: null, 
        background: "#300", 
        items: [
            { type: "inspectable", id: "CL-07", name: "校長的公務印章", content: "側緣有新鮮藍色印泥，印章盒內有一根短黑髮。", detail: "校長是全禿，證明近期有學生動過印章。磨損位置與偽造推薦信上的印跡完全一致。", price: 2, style: { top: "60%", left: "45%", width: "40px", height: "40px", background: "gold" } },
            { type: "inspectable", id: "CL-05", name: "神祕的轉帳記錄", content: "銀行回條顯示向張毅轉帳五萬元，備註「清理多餘的指甲」。", detail: "帳戶歸屬指向「校慶活動專項經費」，轉帳時間為失蹤當晚前一小時。", price: 2, style: { top: "80%", right: "30%", width: "60px", height: "40px", background: "white" } },
            { type: "inspectable", id: "CL-10", name: "受損的監控硬碟", content: "接口被暴力折斷，外殼有指虎狀凹陷。", detail: "這是被人用拳頭砸碎的。最後一條錄製請求來自音樂教室廊道，時間為失蹤當晚 22:15。", price: 3, style: { top: "40%", left: "20%", width: "50px", height: "50px", background: "#555" } }
        ] 
    },

    // 傳送大廳 (Corridor Hub)
    "corridor_hub": { 
        background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('hallway.jpg')", 
        items: [
            { type: "nav", target: "S1", text: "音樂教室", style: { top: "30%", left: "40%", width: "20%", height: "10%", background: "#c0392b", border: "1px solid #fff" } },
            { type: "nav", target: "S2", text: "女生宿舍 302", style: { top: "45%", left: "20%", width: "15%", height: "10%", background: "#8e44ad", border: "1px solid #fff" } },
            { type: "nav", target: "S3", text: "舊大樓儲藏室", style: { top: "45%", right: "20%", width: "15%", height: "10%", background: "#2c3e50", border: "1px solid #fff" } },
            { type: "nav", target: "S4", text: "校長室/學生會室", style: { top: "60%", left: "40%", width: "20%", height: "10%", background: "#27ae60", border: "1px solid #fff" } },
            { type: "item", isCoin: true, id: "coin_school", name: "記憶碎片", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", style: { top: "90%", left: "10%", width: "40px", height: "40px", background: "gold", borderRadius: "50%" } }
        ] 
    },
    "discussion_room": { background: "#111", items: [] }
};

const TRUE_KILLER_ID = "C02"; // 以最終執行禁錮與導致失蹤事實的陳曼為主要真兇 ID
const TRUTH_STORY = `
    <h2>真相大白：舊大樓的連環惡意</h2>
    <p>真相並非單一的謀殺，而是由一連串的「傷害」與「動機置換」交織而成的悲劇。這一切的起點，源於林曉夢意外發現了模範生<b>沈星河</b>偽造校長公務印章以獲取保送資格的秘密。</p>
    <p>校慶預演當晚，沈星河在音樂教室與曉夢發生激烈爭執，失手將她推向鋼琴，導致其頭部重擊琴角大量出血。沈星河誤以為自己殺了人，驚慌地將「屍體」拖入儲藏室，而這一幕被躲在暗處抽菸的<b>張毅</b>目擊。張毅受利益誘惑，不僅未呼救，反而利用監控真空期向沈星河勒索封口費，並試圖按計畫毀掉曉夢的手指以阻止其參賽。</p>
    <p>然而，最扭曲的轉折發生在沈星河離開現場後。室友<b>陳曼</b>出於長期被天才陰影籠罩的嫉妒，在發現曉夢尚有氣息時，並未選擇救人，而是利用沈星河的恐懼，在曉夢意識模糊時將其轉移至地基底層的暗室進行非法禁錮。她長期利用藥物讓曉夢維持在昏睡狀態，試圖在現實中徹底取代林曉夢的位置。</p>
    <p>沈星河的恐懼、張毅的貪婪與陳曼的執念，共同造成了林曉夢「失蹤」三個月的假象。今晚，這棟被詛咒大樓的門鎖終於被揭開，真相不再缺席。</p>
    <p>林曉夢在地下室被救出，但因長期藥物影響與精神折磨，已無法彈琴。沈星河因故意傷害罪與偽造公文書罪被捕；陳曼因非法禁錮罪入獄，其偏執的執念終成幻影；張毅因收受賄賂毀滅證據被開除學籍；柳青與老秦在餘生中揭露了這座名校光鮮下的腐敗根基。<p>
`;

/* =========================================
   3. 遊戲運行狀態變數
   ========================================= */
let currentPage = 0, selectedCharId = null, collectedItems = [], collectedItemsObj = [], unlockedDetails = [], coinCooldowns = {}, currentSceneId = "corridor_hub";
let timerInterval = null, timeLeft = 120, coins = 0, maxInventory = 5, pendingItemData = null, pendingItemDiv = null;
let discussionTime = 300, discussionInterval = null, discussionTimerStarted = false;
let recognition = null, isRecording = false, notebookState = {}, silenceTimeout = null, selectedTimelineChar = null;
let aiTalkInterval = null, currentRound = 1, speechErrors = 0, lastSpeechTime = 0;

/* =========================================
   4. 基礎功能函數
   ========================================= */
function startSurvey() { switchScene('scene-survey'); }

function submitSurvey(e) { 
    e.preventDefault(); 
    switchScene('scene-loading'); 
    setTimeout(() => { switchScene('scene-char-select'); initCharBook(); }, 2000); 
}

function initCharBook() { currentPage = 0; renderPage(); }

function renderPage() {
    playSFX(sfx.click);
    const container = document.getElementById('book-page'); 
    if(!container) return;
    container.innerHTML = "";
    
    const start = currentPage * 2; 
    const end = start + 2;
    
    characterData.slice(start, end).forEach(char => {
        const row = document.createElement('div'); 
        row.className = 'char-row campus-profile'; // 增加校園風 class
        row.onclick = () => showCharDetail(char.id);
        
        const left = document.createElement('div'); 
        left.className = 'char-left';
        // 將頭像處理成類似「學生檔案照」的感覺
        left.innerHTML = `
            <div class="photo-frame">
                <img src="${char.image}" style="filter: grayscale(0.3) sepia(0.2);">
            </div>
            <div class="detail-hint">【查看檔案】</div>
        `;
        
        const right = document.createElement('div'); 
        right.className = 'char-right';
        right.innerHTML = `
            <div class="char-header">
                <span class="char-id">NO.${char.id}</span>
                <h3>${char.name}</h3>
            </div>
            <div class="char-identity">身份：${char.identity}</div>
            <p class="char-intro">${char.script_intro}</p>
        `;
        
        row.appendChild(left); 
        row.appendChild(right); 
        container.appendChild(row);
    });

    // 分頁控制
    document.getElementById('page-num').innerText = `第 ${currentPage + 1} 頁`;
    document.querySelector('.book-nav.prev').style.display = currentPage === 0 ? 'none' : 'block';
    document.querySelector('.book-nav.next').style.display = end >= characterData.length ? 'none' : 'block';
}

function changePage(d) { currentPage += d; renderPage(); }

function showCharDetail(id) { const char = characterData.find(c=>c.id===id); selectedCharId=id; document.getElementById('detail-name').innerText=char.name; document.getElementById('detail-age').innerText=char.age; document.getElementById('detail-identity').innerText=char.identity; document.getElementById('detail-personality').innerText=char.personality; document.getElementById('detail-intro').innerHTML=char.script_intro; document.getElementById('detail-img').src=char.image; document.getElementById('char-modal').style.display='flex'; }

function closeCharDetail() { document.getElementById('char-modal').style.display='none'; }

function confirmCharacter() { 
    closeCharDetail(); 
    const char = characterData.find(c => c.id === selectedCharId); 
    
    // 更新私密劇本視窗
    document.getElementById('private-role-name').innerText = char.name; 
    document.getElementById('private-full-story').innerHTML = char.full_story; 
    document.getElementById('private-mission').innerHTML = char.mission; // 改用 innerHTML
    
    document.getElementById('private-script-modal').style.display = 'flex'; 
    
    // 同步更新側邊欄或筆記本中的角色資訊標籤頁
    document.getElementById('tab-role').innerHTML = `
        <p><strong>【你的身分】</strong> ${char.name} (${char.identity})</p>
        <hr>
        <p><strong>【過往真相】</strong><br>${char.full_story}</p>
        <div style="background:#fff3f3; padding:10px; border-left:4px solid red; margin-top:10px;">
            <strong>【核心任務】</strong><br>${char.mission}
        </div>
    `; 
}

function finishPrivateScript() { document.getElementById('private-script-modal').style.display='none'; document.getElementById('main-story-modal').style.display='flex'; }

function enterGame() { 
    // 嘗試播放符合校園懸疑感的背景音樂
    bgm.play().catch(e => console.warn("背景音樂播放失敗：", e)); 
    
    document.getElementById('main-story-modal').style.display = 'none'; 
    switchScene('game-stage-container'); 
    
    // UI 元件顯示
    document.getElementById('inventory-bar').style.display = 'flex'; 
    document.getElementById('btn-sidebar').style.display = 'block'; 
    
    // 狀態初始化
    document.getElementById('round-num').innerText = currentRound; 
    currentSceneId = 'corridor_hub'; // 確保同步全域變數
    loadScene('corridor_hub'); 
    
    // 啟動計時器 (建議加入提示：距離校警巡邏還有 120 秒)
    timeLeft = 120; 
    startTimer(); 
    refreshInventory(); 
    
    showMessageBox(`調查開始。今晚，真相若不見光，誰也無法走出這棟樓。`);
}

function canUnlockDeepDetail(item) {
    if (!selectedCharId) return false;

    // C01 沈星河：模範生 / 原始傷害者
    // 對自己偽造的印章與肢體衝突留下的鏡腿有直覺
    if (selectedCharId === 'C01') {
        if (item.id === 'CL-07' || item.id === 'CL-12' || item.id === 'CL-03') return true;
    }

    // C02 陳曼：室友 / 禁錮者
    // 對禁錮地點（地基泥土）與其使用的藥物、香水極其敏感
    if (selectedCharId === 'C02') {
        if (item.id === 'CL-02' || item.id === 'CL-08' || item.id === 'CL-11') return true;
    }

    // C03 張毅：體育生 / 勒索者
    // 對於毀滅證據（硬碟）、收賄（轉帳）與其擅長的魚線結最為了解
    if (selectedCharId === 'C03') {
        if (item.id === 'CL-10' || item.id === 'CL-05' || item.id === 'CL-06') return true;
    }

    // C04 柳青：新任校醫 / 邏輯診斷者
    // 醫學專業，能一眼看出藥物成分、血跡噴濺規律或便當來源
    if (selectedCharId === 'C04') {
        if (item.id === 'CL-02' || item.id === 'CL-01' || item.id === 'CL-11') return true;
    }

    // C05 老秦：管理員 / 神祕目擊者
    // 熟悉大樓結構，對抓痕、通風口與不屬於這裡的物品（舞鞋）有印象
    if (selectedCharId === 'C05') {
        if (item.id === 'CL-04' || item.id === 'CL-08' || item.id === 'CL-09') return true;
    }

    return false;
}

/**
 * 調查物品的核心邏輯
 * @param {string} itemId - 證物 ID (例如: "CL-01")
 */
function inspectItem(itemId) {
    // 1. 從 Evidence_Inventory 找到對應的線索資料
    const item = Evidence_Inventory.find(i => i.ID === itemId);
    if (!item) {
        showMessageBox("系統錯誤：找不到此證物資料。");
        return;
    }

    // 2. 檢查是否已經解鎖過深度解析
    const isAlreadyUnlocked = unlockedDetails.includes(itemId);
    
    // 3. 檢查當前角色是否擁有「專屬直覺」 (免碎片解鎖)
    const isFree = canUnlockDeepDetail(item);

    // 4. 準備顯示調查面板
    showInspectPanel(item, isFree || isAlreadyUnlocked);
}

/**
 * 顯示調查面板 UI
 * @param {Object} item - 證物物件
 * @param {boolean} showDeep - 是否直接顯示深度解析
 */
function showInspectPanel(item, showDeep) {
    const modal = document.getElementById('item-detail-modal');
    if (!modal) return;

    // 1. 填入基本資訊
    document.getElementById('item-modal-title').innerText = item.Name;
    document.getElementById('item-modal-base').innerText = item.Base_Observation;
    
    const deepSection = document.getElementById('item-modal-deep-section');
    const unlockBtn = document.getElementById('item-modal-unlock-btn');

    // 2. 處理深度解析內容渲染
    if (showDeep) {
        // 渲染深度解讀內容（使用我們剛才 CSS 定義的樣式）
        let deepHTML = `<div class="deep-header">【深度調查報告】</div>`;
        item.Interpretations.forEach(interp => {
            deepHTML += `
                <div class="interpretation-item">
                    <strong>分析角度：${interp.Aspect}</strong>
                    <p>${interp.Deep_Truth}</p>
                </div>
            `;
        });
        
        deepSection.innerHTML = deepHTML;
        deepSection.style.display = 'block'; // 顯示深層內容
        unlockBtn.style.display = 'none';    // 隱藏解鎖按鈕
        
        // 紀錄已解鎖
        if (!unlockedDetails.includes(item.ID)) {
            unlockedDetails.push(item.ID);
        }
    } else {
        // 未解鎖狀態
        deepSection.style.display = 'none';
        unlockBtn.style.display = 'block';
        unlockBtn.innerText = `消耗 2 枚記憶碎片解鎖深度解析`;
        unlockBtn.onclick = () => tryUnlockDeep(item);
    }

    // 3. 顯示 Modal
    modal.style.display = 'flex';
}

/**
 * 輔助函式：播放音效 (確保你的 sfx 物件已定義)
 */
function playSFX(audio) {
    if (audio && audio.play) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("音效播放受阻"));
    }
}

function showMessageBox(text) {
    // 檢查有沒有既有的訊息框，沒有就用 alert，有就填入文字
    const msgBox = document.getElementById('game-message-box');
    if (msgBox) {
        msgBox.innerText = text;
        msgBox.classList.add('active');
        setTimeout(() => msgBox.classList.remove('active'), 3000);
    } else {
        alert(text);
    }
}

/**
 * 嘗試花費碎片解鎖深度解析
 */
function tryUnlockDeep(item) {
    const cost = 2; // 設定解鎖費用
    if (coins >= cost) {
        coins -= cost;
        document.getElementById('coin-count').innerText = coins; // 更新 UI 上的金幣數
        playSFX(sfx.unlock); // 播放解鎖音效
        
        unlockedDetails.push(item.ID);
        showMessageBox("成功解鎖深度解析！");
        
        // 重新渲染面板顯示深度內容
        showInspectPanel(item, true);
        
        // 自動加入證物袋 (如果尚未加入)
        addToInventory(item.ID);
    } else {
        showMessageBox("記憶碎片不足，無法解鎖深層真相...");
        playSFX(sfx.error);
    }
}

/**
 * 將證物加入物品欄
 */
function addToInventory(itemId) {
    if (!collectedItems.includes(itemId)) {
        collectedItems.push(itemId);
        refreshInventory(); // 重新渲染物品欄 UI
    }
}

function loadScene(id) { 
    const d = gameData[id]; 
    if (!d) return; 
    
    // 回合限制檢查
    if (d.reqRound && d.reqRound > currentRound) { 
        showMsg(`🚫 此區域目前封鎖中，預計第 ${d.reqRound} 回合開放`); 
        return; 
    }
    
    currentSceneId = id; 
    document.getElementById('location-name').innerText = d.name; 
    document.getElementById('game-ui-layer').style.display = 'block'; 
    
    const s = document.getElementById('game-stage'); 
    // 背景處理：支援顏色代碼或圖片路徑
    s.style.backgroundImage = d.background.includes('#') ? 'none' : `url(${d.background})`; 
    s.style.backgroundColor = d.background.includes('#') ? d.background : 'transparent'; 
    s.innerHTML = ''; 
    
    // 左右切換按鈕顯示
    document.querySelector('.look-left').style.display = d.left ? 'block' : 'none'; 
    document.querySelector('.look-right').style.display = d.right ? 'block' : 'none'; 
    
    d.items.forEach(i => { 
        // 記憶碎片（金幣）冷卻邏輯
        if (i.type === 'item' && i.isCoin) { 
            if (coinCooldowns[i.id] && Date.now() < coinCooldowns[i.id]) { 
                setTimeout(() => { if (currentSceneId === id) loadScene(id); }, coinCooldowns[i.id] - Date.now()); 
                return; 
            } 
        } 
        
        const div = document.createElement('div'); 
        div.className = i.className || 'hotspot'; 
        if (i.type === 'nav') div.innerText = i.text; 
        
        // 如果是已收集的物品，加上視覺標籤
        if (i.type === 'inspectable' && collectedItems.includes(i.id)) {
            div.classList.add('collected'); 
        }
        
        Object.assign(div.style, i.style); 
        
        div.onclick = () => { 
            if (i.type === 'nav') {
                playSFX(sfx.sceneSwap); 
                loadScene(i.target); 
            } 
            else if (i.type === 'item' && i.isCoin) { 
                playSFX(sfx.pickup); 
                coins++; 
                updateCoinUI(); 
                showMsg("獲得記憶碎片 +1"); 
                div.style.display = 'none'; 
                coinCooldowns[i.id] = Date.now() + 35000; 
                setTimeout(() => { if (currentSceneId === id) div.style.display = 'block'; }, 35000); 
            } 
            else if (i.type === 'inspectable') { 
                // --- 核心改動：改用我們新寫的 inspectItem ---
                playSFX(sfx.click);
                inspectItem(i.id); 
                // ------------------------------------------
            } 
            else if (i.type === 'special') { 
                // 配合校園氛圍修改警告文字
                showMsg(`⚠️ 警告：${i.trigger === 'sophie_alert' ? '感覺有人在看著你...' : '觸發未知事件'}`); 
            } 
        }; 
        s.appendChild(div); 
    }); 
}

function openPickupModal(i,d) { pendingItemData=i; pendingItemDiv=d; document.getElementById('pickup-name').innerText=i.name; document.getElementById('pickup-img').src=i.icon||""; document.getElementById('pickup-modal').style.display='flex'; }
function cancelPickup() { document.getElementById('pickup-modal').style.display='none'; pendingItemData=null; }
// 讓玩家點擊地圖物品時，先跳出「是否撿起」的確認窗
function confirmPickup() { 
    if(!pendingItemData) return; 
    playSFX(sfx.pickup); 
    
    if(collectedItemsObj.length >= maxInventory){ 
        showMsg(`❌ 檔案夾已滿！(上限 ${maxInventory} 件)`); 
        cancelPickup(); 
        return; 
    } 
    
    showMsg(`取得證物：${pendingItemData.name}`); 
    collectedItems.push(pendingItemData.id); 
    
    // 紀錄發現地點
    pendingItemData.locationFound = document.getElementById('location-name').innerText; 
    collectedItemsObj.push(pendingItemData); 
    
    refreshInventory(); 
    if(pendingItemDiv) pendingItemDiv.classList.add('collected'); 
    document.getElementById('pickup-modal').style.display = 'none'; 
    
    // 撿起後，自動觸發「深入調查」面板
    inspectItem(pendingItemData.id); 
}
function showFile(i) { 
    playSFX(sfx.openFile); 
    document.getElementById('file-title').innerText = `【卷宗】${i.name}`; 
    document.getElementById('file-location').innerText = i.locationFound ? `📍 發現地點：${i.locationFound}` : ""; 
    
    // 從 Evidence_Inventory 抓取詳細資料
    const evidenceData = Evidence_Inventory.find(e => e.ID === i.id);
    let contentHTML = `<p>${i.content || evidenceData.Base_Observation}</p>`; 
    
    if (unlockedDetails.includes(i.id)) { 
        contentHTML += `<div class="file-deep-analysis">`;
        contentHTML += `<h4>[ 深度分析報告 ]</h4>`;
        evidenceData.Interpretations.forEach(interp => {
            contentHTML += `<p><strong>${interp.Aspect}：</strong>${interp.Deep_Truth}</p>`;
        });
        contentHTML += `</div>`;
    } 
    
    document.getElementById('file-text').innerHTML = contentHTML; 
    document.getElementById('file-modal').style.display = 'flex'; 
}
function refreshInventory() { const b=document.getElementById('inventory-bar'); b.innerHTML=''; for(let k=0;k<maxInventory;k++){ const s=document.createElement('div'); s.className='inv-slot'; if(k<collectedItemsObj.length){ const it=collectedItemsObj[k]; if(unlockedDetails.includes(it.id))s.classList.add('unlocked'); const img=document.createElement('img'); img.src=it.icon; s.appendChild(img); s.onclick=()=>showFileFromBag(it.id); s.draggable=true; s.ondragstart=(e)=>{e.dataTransfer.setData("itemId",it.id);}; } else { s.innerText="空"; } b.appendChild(s); } }
function showFileFromBag(id) { const i=collectedItemsObj.find(x=>x.id===id); if(i)showFile(i); }
function updateCoinUI() { document.getElementById('coin-display').innerText=coins; document.getElementById('shop-coin-display').innerText=coins; }
function openShop() { 
    const list = document.getElementById('shop-list'); 
    list.innerHTML = ""; 

    // 背包擴充：包裝成「整理筆記技巧」
    const bagRow = document.createElement('div'); 
    bagRow.className = 'shop-row'; 
    bagRow.innerHTML = `<span>🧠 整理思緒 (背包 +1)</span><button class="btn-buy" onclick="expandBag(5)">5 碎</button>`; 
    list.appendChild(bagRow); 

    // 線索解鎖
    collectedItemsObj.forEach(i => { 
        // 假設每個線索解鎖統一花費 2 碎
        const price = 2; 
        const isUnlocked = unlockedDetails.includes(i.id); 
        const r = document.createElement('div'); 
        r.className = 'shop-row'; 
        r.innerHTML = `
            <span>📄 解析：${i.name}</span>
            <button class="btn-buy" onclick="buyDetail('${i.id}', ${price})" ${isUnlocked ? 'disabled' : ''}>
                ${isUnlocked ? '已洞察' : price + ' 碎'}
            </button>`; 
        list.appendChild(r); 
    }); 
    document.getElementById('shop-modal').style.display = 'flex'; 
}
function buyDetail(id, cost) { if(coins>=cost){ playSFX(sfx.pickup); coins-=cost; updateCoinUI(); unlockedDetails.push(id); showMsg("✅ 購買成功！"); openShop(); refreshInventory(); }else{ playSFX(sfx.error); showMsg("❌ 金幣不足！"); } }
function expandBag(cost) { if(coins>=cost){ coins-=cost; updateCoinUI(); maxInventory++; refreshInventory(); showMsg("✅ 背包已擴充！"); }else{ showMsg("❌ 金幣不足！"); } }
function openSidebar() { document.getElementById('sidebar-panel').classList.add('open'); } 
function closeSidebar() { document.getElementById('sidebar-panel').classList.remove('open'); }
function switchTab(t) { playSFX(sfx.click); document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active')); document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active')); if(window.event) event.target.classList.add('active'); document.getElementById('tab-'+t).classList.add('active'); }
function panView(d) { const c=gameData[currentSceneId]; if(d==='left'&&c.left)loadScene(c.left); if(d==='right'&&c.right)loadScene(c.right); }
function openMap() { document.getElementById('map-modal').style.display='flex'; const rooms = document.querySelectorAll('.map-room'); rooms.forEach(r => { const onclickStr = r.getAttribute('onclick'); let targetId = onclickStr.match(/'([^']+)'/)[1]; let targetData = gameData[targetId]; r.classList.remove('locked'); let lockIcon = r.querySelector('.lock-icon'); if(lockIcon) lockIcon.style.display = 'none'; if(targetData.reqRound && targetData.reqRound > currentRound) { r.classList.add('locked'); if(lockIcon) lockIcon.style.display = 'block'; } }); } 
function closeMap() { document.getElementById('map-modal').style.display='none'; } 
function teleport(id) { playSFX(sfx.sceneSwap); closeMap(); loadScene(id); }
function startTimer() { clearInterval(timerInterval); timerInterval=setInterval(()=>{ timeLeft--; let m=Math.floor(timeLeft/60), s=timeLeft%60; document.getElementById('timer').innerText=`${m<10?'0'+m:m}:${s<10?'0'+s:s}`; if(timeLeft<=0){ clearInterval(timerInterval); enterDiscussion(); } },1000); }
function showMsg(t) { const b=document.getElementById('message-box'); b.innerText=t; b.style.display='block'; setTimeout(()=>b.style.display='none',2000); }

function enterDiscussion() { bgm.pause(); clearInterval(timerInterval); document.getElementById('game-ui-layer').style.display='none'; switchScene('discussion-scene'); setupDiscussionUI(); document.getElementById('discussion-timer').innerText="05:00"; discussionTimerStarted=false; document.getElementById('inventory-bar').style.display='flex'; document.getElementById('inventory-bar').style.zIndex='2000'; document.getElementById('discussion-scene').classList.remove('listening-mode'); document.getElementById('btn-mic').classList.remove('active'); document.getElementById('btn-mic').style.display='flex'; document.getElementById('btn-finish').style.display='flex'; document.querySelector('.dashboard-panel').style.display='flex'; document.querySelector('.ai-speaking-stage').style.display='none'; document.querySelector('.btn-end-meeting').style.display='none'; }
function startDiscussionTimer() { clearInterval(discussionInterval); discussionTime=300; discussionInterval=setInterval(()=>{ discussionTime--; let m=Math.floor(discussionTime/60), s=discussionTime%60; document.getElementById('discussion-timer').innerText=`${m<10?'0'+m:m}:${s<10?'0'+s:s}`; if(discussionTime<=0){ clearInterval(discussionInterval); finishSpeaking(); } },1000); }
function finishSpeaking() { if(recognition) recognition.stop(); isRecording=false; clearInterval(discussionInterval); clearInterval(silenceTimeout); document.getElementById('discussion-scene').classList.add('listening-mode'); document.getElementById('btn-mic').classList.remove('active'); document.getElementById('btn-mic').style.display='none'; document.getElementById('btn-finish').style.display='none'; document.querySelector('.dashboard-panel').style.display='none'; document.querySelector('.ai-speaking-stage').style.display='flex'; document.querySelector('.btn-end-meeting').style.display='flex'; startAIRotation(); }
function endMeeting() { clearInterval(aiTalkInterval); if(currentRound===1){ currentRound=2; showMsg("第二回合搜查開始！"); enterGame(); }else{ switchScene('scene-voting'); setupVoting(); } }

function startAIRotation() { const pIdx = characterData.findIndex(c=>c.id===selectedCharId); let aiOrder=[]; for(let i=1;i<characterData.length;i++){ aiOrder.push(characterData[(pIdx+i)%characterData.length]); } let aiIndex=0; const av=document.getElementById('ai-active-avatar'); const nm=document.getElementById('ai-active-name'); if(aiTalkInterval)clearInterval(aiTalkInterval); updateAIDisplay(aiOrder, aiIndex); aiTalkInterval=setInterval(()=>{ aiIndex=(aiIndex+1)%aiOrder.length; updateAIDisplay(aiOrder, aiIndex); },4000); function updateAIDisplay(list, idx){ av.classList.remove('speaking'); av.style.opacity=0.3; setTimeout(()=>{ const c=list[idx]; av.src=c.image; nm.innerText=c.name+" 正在發言..."; av.classList.add('speaking'); av.style.opacity=1; },500); } }

function setupDiscussionUI() { const l=document.getElementById('nb-char-list'); l.innerHTML=""; characterData.forEach(c=>{ const d=document.createElement('div'); d.className='char-wrapper'; d.innerHTML=`<img src="${c.image}" class="char-avatar" onclick="selectNoteChar('${c.id}', this)"> <div class="char-name-label">${c.name}</div>`; l.appendChild(d); }); const tl=document.getElementById('nb-timeline-char-list'); tl.innerHTML=""; characterData.forEach(c=>{ const d=document.createElement('div'); d.className='char-wrapper'; d.innerHTML=`<img src="${c.image}" class="char-avatar" onclick="selectTimelineChar('${c.id}', this)"> <div class="char-name-label">${c.name}</div>`; tl.appendChild(d); }); const inv=document.getElementById('inventory-bar'); inv.style.display='flex'; inv.style.zIndex='2000'; if('webkitSpeechRecognition' in window){ recognition=new webkitSpeechRecognition(); recognition.continuous=true; recognition.interimResults=true; recognition.onresult=handleSpeechResult; }else{ document.getElementById('speech-status').innerText="瀏覽器不支援語音"; } }
let selectedNoteChar=null; function selectNoteChar(id, el){ selectedNoteChar=id; document.querySelectorAll('#nb-char-list .char-wrapper').forEach(e=>e.classList.remove('selected')); el.parentElement.classList.add('selected'); const c=characterData.find(x=>x.id===id); const info=document.getElementById('nb-selected-info'); info.style.display='block'; info.innerHTML=`<strong style="font-size:16px;">${c.name}</strong> (${c.age})<br><span style="color:#f39c12;">${c.identity}</span> | ${c.personality}<br><div style="margin-top:5px; color:#aaa; font-size:12px;">${c.script_intro}</div>`; const drop=document.getElementById('evidence-drop-zone'); drop.innerText=""; if(!notebookState[id])notebookState[id]=[]; if(notebookState[id].length===0){ drop.innerHTML="<p style='color:#666'>拖曳證物至此</p>"; }else{ notebookState[id].forEach(i=>addEvidenceToUI(i)); } }
const dropZone=document.getElementById('evidence-drop-zone'); 
if(dropZone){
    dropZone.ondragover=(e)=>{e.preventDefault();dropZone.classList.add('drag-over');}; 
    dropZone.ondragleave=()=>{dropZone.classList.remove('drag-over');}; 
    dropZone.ondrop=(e)=>{e.preventDefault();dropZone.classList.remove('drag-over'); if(!selectedNoteChar){showMsg("請先選擇角色！");return;} const iId=e.dataTransfer.getData("itemId"); const item=collectedItemsObj.find(x=>x.id===iId); if(item&&!notebookState[selectedNoteChar].includes(item)){ notebookState[selectedNoteChar].push(item); addEvidenceToUI(item); } };
}
function addEvidenceToUI(i){ const d=document.getElementById('evidence-drop-zone'); if(d.querySelector('p'))d.innerHTML=""; const v=document.createElement('div'); v.className='nb-item'; v.innerHTML=`<img src="${i.icon}"><div class="nb-text"><strong>${i.name}</strong><small>${i.content}</small></div>`; d.appendChild(v); }
function selectTimelineChar(id, el){ selectedTimelineChar=id; document.querySelectorAll('#nb-timeline-char-list .char-wrapper').forEach(e=>e.classList.remove('selected')); el.parentElement.classList.add('selected'); }
function addTimelineEntry() {
    if (!selectedTimelineChar) { showMsg("請先選擇角色！"); return; }
    
    const c = characterData.find(x => x.id === selectedTimelineChar);
    const container = document.getElementById('timeline-container');
    
    // 建立一個唯一 ID 給這條紀錄，方便後續存取內容
    const entryId = `tl_${Date.now()}`;
    
    const d = document.createElement('div');
    d.className = 'timeline-entry';
    d.id = entryId;
    d.innerHTML = `
        <img src="${c.image}" class="timeline-avatar">
        <div class="timeline-inputs">
            <input class="timeline-input time" placeholder="時間" onchange="updateTimelineData('${entryId}', '${c.id}')">
            <input class="timeline-input loc" placeholder="地點" onchange="updateTimelineData('${entryId}', '${c.id}')">
            <input class="timeline-input event" placeholder="具體事件" onchange="updateTimelineData('${entryId}', '${c.id}')">
        </div>
        <button class="btn-delete-entry" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(d);
}

// 用於儲存玩家梳理出的邏輯鏈（可選）
function updateTimelineData(entryId, charId) {
    const el = document.getElementById(entryId);
    const data = {
        charId: charId,
        time: el.querySelector('.time').value,
        loc: el.querySelector('.loc').value,
        event: el.querySelector('.event').value
    };
    // 你可以將此資料存入一個全域物件，如 timelineState = []
    console.log("更新時間線紀錄:", data);
}

function checkSilence(){ if(isRecording&&Date.now()-lastSpeechTime>10000){ document.getElementById('afk-overlay').classList.add('active'); recognition.stop(); isRecording=false; document.getElementById('btn-mic').classList.remove('active'); document.getElementById('speedometer').classList.remove('active'); } }
function resumeFromAFK(){ document.getElementById('afk-overlay').classList.remove('active'); lastSpeechTime=Date.now(); }
function toggleMic(){ if(!recognition) return; if(isRecording){ recognition.stop(); isRecording=false; document.getElementById('btn-mic').classList.remove('active'); document.getElementById('speedometer').classList.remove('active'); document.getElementById('speech-status').innerText="已停止發言"; clearInterval(silenceTimeout); }else{ recognition.start(); isRecording=true; document.getElementById('btn-mic').classList.add('active'); document.getElementById('speedometer').classList.add('active'); document.getElementById('speech-status').innerText="🔴 正在聆聽..."; lastSpeechTime=Date.now(); clearInterval(silenceTimeout); silenceTimeout=setInterval(checkSilence,1000); if(!discussionTimerStarted){ startDiscussionTimer(); discussionTimerStarted=true; } } }
function handleSpeechResult(e){ let txt=''; for(let i=e.resultIndex;i<e.results.length;++i){ if(e.results[i].isFinal)txt+=e.results[i][0].transcript; } if(txt){ lastSpeechTime=Date.now(); const box=document.getElementById('transcription-box'); const p=document.createElement('p'); p.innerText=txt; box.appendChild(p); box.scrollTop=box.scrollHeight; if(Math.random()<0.1)speechErrors++; updateNeedle(5); } }
function updateNeedle(s){ let a=-90+(s*18); if(a>90)a=90; document.getElementById('needle').style.transform=`translateX(-50%) rotate(${a}deg)`; }
function switchNoteTab(t){ document.querySelectorAll('.nb-tab').forEach(b=>b.classList.remove('active')); document.querySelectorAll('.nb-content').forEach(c=>c.classList.remove('active')); if(window.event) event.target.classList.add('active'); document.getElementById('nb-'+t).classList.add('active'); }

function setupVoting() { const c=document.getElementById('voting-container'); c.innerHTML=""; characterData.forEach(ch=>{ const d=document.createElement('div'); d.className='vote-card'; d.innerHTML=`<img src="${ch.image}"><h3>${ch.name}</h3>`; d.onclick=()=>submitVote(ch.id); c.appendChild(d); }); }

function submitVote(vid) {
    if (bgm) {
        bgm.pause();
        bgm.currentTime = 0; 
    }

    const winner = characterData.find(c => c.id === vid);
    // 根據 Truth_DB，真兇/最終禁錮者為 C02 (陳曼)
    const isWin = (vid === TRUE_KILLER_ID); 
    
    switchScene('scene-result');
    const res = document.getElementById('result-content');
    const stats = document.getElementById('stats-display');

    // 計算發言表現與評分
    document.getElementById('end-errors').innerText = speechErrors;
    const score = Math.min(99, Math.max(1, 100 - (speechErrors * 5))); // 調高錯誤懲罰
    document.getElementById('percentile').innerText = score;
    stats.style.display = 'block';

    if(isWin) {
        playSFX(sfx.win);
        // 成功結局：揭穿陳曼與沈星河的連環惡意
        res.innerHTML = `
            <h1 class="result-title win-title">真相大白</h1>
            <div class="result-badge">成功救出林曉夢</div>
            <p>你精確地指認了 <b>${winner.name}</b>。在證據面前，${winner.name} 終於交出了舊大樓地基暗室的鑰匙。</p>
            <hr>
            <div class="result-desc">
                ${TRUTH_STORY}
            </div>
            <div class="epilogue-box">
                <h4>【後記：聖德中學的清晨】</h4>
                <p>林曉夢被救出後，這所名校維持多年的「零犯罪」神話徹底破滅。沈星河、陳曼與張毅分別面臨法律與校規的嚴厲制裁。雖然曉夢的手傷可能永遠無法痊癒，但至少，今晚的噩夢結束了。</p>
            </div>
        `;
    } else {
        playSFX(sfx.lose);
        // 失敗結局：抓錯人，真兇逍遙法外
        res.innerHTML = `
            <h1 class="result-title lose-title">推論錯誤</h1>
            <p>你們指控了 <b>${winner.name}</b>，但這顯然正中真兇下路。</p>
            <div class="lose-reason">
                <p>當晚，${winner.name} 被校方帶走調查，而真正的惡意依然躲在舊大樓的陰影中發笑。</p>
                <p style="color:#e74c3c; font-weight:bold; margin-top:10px;">三個月後，舊大樓的地基下傳來了斷斷續續的鋼琴聲...但已經沒有人去查看了。</p>
            </div>
            <p style="color:#777; font-size:14px; margin-top:20px;">(真相尚未完全解鎖，請重新審視筆記本中的證據關聯)</p>
            <button class="btn-retry" onclick="location.reload()">重新調查</button>
        `;
    }
}

/* === 3. 核心功能函式 === */
function enterWorldIntro() {
    // 進入世界觀畫面
    switchScene('scene-world-intro');
    document.body.classList.add('alarm-active');

    // 啟動音效
    alertSound.volume = 1.0; 
    alertSound.currentTime = 0;
    alertSound.play().catch(e => console.warn("請先點擊頁面以播放音訊"));

    let i = 0;
    const target = document.getElementById('world-text');
    if (!target) return;
    target.innerHTML = "";

    function typeWriter() {
        if (i < worldIntroText.length) {
            target.innerHTML += worldIntroText.charAt(i);
            i++;
            setTimeout(typeWriter, 50); 
        } else {
            // 文字播完，淡出音效並跳轉
            const fadeInterval = setInterval(() => {
                if (alertSound.volume > 0.1) alertSound.volume -= 0.1;
                else {
                    alertSound.pause();
                    clearInterval(fadeInterval);
                }
            }, 200);

            setTimeout(() => {
                document.body.classList.remove('alarm-active');
                switchScene('scene-survey');
            }, 3000);
        }
    }
    typeWriter();
}

function returnToHome() { location.reload(); }
function returnToCharSelect() {
    // 1. 停止所有執行中的計時器與音效
    clearInterval(timerInterval);
    clearInterval(discussionInterval);
    if (bgm) { bgm.pause(); bgm.currentTime = 0; }
    if (recognition) { recognition.stop(); isRecording = false; }

    // 2. 核心變數重置
    currentPage = 0; 
    selectedCharId = null; 
    collectedItems = []; 
    collectedItemsObj = []; 
    unlockedDetails = []; 
    coinCooldowns = {}; 
    currentSceneId = "corridor_hub";
    timeLeft = 120; 
    coins = 0; 
    maxInventory = 5; 
    notebookState = {}; 
    speechErrors = 0; 
    currentRound = 1;

    // 3. UI 元素清空與重置
    document.getElementById('inventory-bar').innerHTML = "";
    document.getElementById('inventory-bar').style.display = 'none';
    document.getElementById('btn-sidebar').style.display = 'none';
    document.getElementById('game-ui-layer').style.display = 'none';
    
    // 清除可能殘留的對話視窗或訊息
    const msgBox = document.getElementById('message-box');
    if (msgBox) msgBox.style.display = 'none';
    
    const transBox = document.getElementById('transcription-box');
    if (transBox) transBox.innerHTML = ""; // 清空上一場的發言紀錄

    // 4. 切換場景並重新初始化選角書
    switchScene('scene-char-select');
    initCharBook();
    
    showMsg("已重置調查進度，請重新選擇身分。");
}
