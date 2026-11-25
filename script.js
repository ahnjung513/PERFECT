
// Firebase 모듈 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// Firebase 프로젝트 설정
const firebaseConfig = {
    apiKey: "AIzaSyAyBpH3oydVKZLk3RluJIbzvG1lEHVNLYo",
    authDomain: "perfect-8a0f6.firebaseapp.com",
    projectId: "perfect-8a0f6",
    storageBucket: "perfect-8a0f6.firebasestorage.app",
    messagingSenderId: "321104193546",
    appId: "1:321104193546:web:07fe1a14f29426957d17f3"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// URL에서 관람객 ID 가져오기
const params = new URLSearchParams(window.location.search);
const resultId = params.get("id");

// 결과 화면 표시 함수
function displayResult(result) {

    document.getElementById("color-circle").style.backgroundColor =
        result.color;

    document.getElementById("color-name").textContent =
        result.colorName;

    document.getElementById("color-code").textContent =
        result.color;
}

// 오류 화면 표시 함수
function displayError(message) {

    document.getElementById("color-circle").style.backgroundColor =
        "#E5E5E5";

    document.getElementById("color-name").textContent = message;

    document.getElementById("color-code").textContent = "";
}

// Firebase에서 결과 불러오기
async function loadResult() {

    displayError("Loading...");

    if (!resultId) {
        displayError("결과 ID가 없습니다.");
        return;
    }

    try {

        const docRef = doc(db, "results", resultId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const result = docSnap.data();

            displayResult(result);

            console.log("결과 불러오기 성공:", result);

        } else {

            displayError("결과를 찾을 수 없습니다.");

        }

    } catch (error) {

        console.error("Firebase 연결 오류:", error);

        displayError("결과를 불러올 수 없습니다.");

    }
}

loadResult();
