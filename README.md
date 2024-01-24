# Converter_Project
 capstone

 Github 협업 가이드 
 ----------------------
 git clone https://github.com/lvnvn177/Converter_Project.git -> 현재 경로에 캡스톤 저장소 클론 생성 


 git add . -> 현재 작성한 모든 수정사항 commit 전 올리기   
 
 
 git commit -m "설명 메시지" -> 수정을 할 때 어떤 작업을 했는지 설명 추가 
 
 
 git push origin main -> add한 수정사항 적용하기

 위의 순서대로 명령어를 입력하면 수정이 적용 됨

노션에 올린 사이트에서 나와있듯이

 git branch brchA
 
 git branch brchB
 
 git branch brchC

이런 식으로 각자 작업 공간을 나눠서 작업을 한 뒤 main_branch에 merge 예정 hello

참고 : https://github.com/TheCopiens/algorithm-study/blob/master/docs/github/howToCreate_branch.md


## node package 명령어

server, client 패키지 설치

    npm install


react build(run client 전 실행해야 client 변경사항 적용)

    npm run build


node 런타임 실행(동시, client만, server만)

    npm run start
    npm run client
    npm run server

------------------------------------------
backend 

1. 구글드라이브에서 받은 .env파일(중요 환경변수)을 Converter_project 폴더에 저장 -> aws-s3_FileUpload.js에서 s3객체 생성 시 필요한 환경 변수들

2. .csv파일은 s3 로그인에 필요 

        로그인 url 접속 후 사용자 이름, 암호를 입력 후 로그인 
        접속 후 s3에 들어가서 스토리지에 저장된 파일 확인(파일 업로드 후)

