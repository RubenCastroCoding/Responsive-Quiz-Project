var quiz=[ { question:'Inside which HTML element do we put the JavaScript?', options: [ 'script', 'scripting', 'javascript'], answerIndex: 0 },
                       { question:'Where is the correct place to insert a JavaScript?', options: [ 'head', 'body', 'none'], answerIndex: 1 },
                       { question:'How do you write "Hello World" in an alert box?', options: [ 'msgBox("Hello World")', 'msg("Hello World")', 'alert("Hello World")'], answerIndex: 2 },
                       { question:'How do you create a function in JavaScript?', options: [ 'function myFunction()', 'function =myFunction()', 'function:myFunction()'], answerIndex: 0 },
                       { question:'How do you call a function named "myFunction"?', options: [ 'call function myFunction()', 'myFunction()', 'call myFunction()'], answerIndex: 1 }   ];

            var timer;
            var game = { time: 60, currentQuestion:0, answers:[] };      

            DrawIntro();

            document.getElementById('start').addEventListener('click', StartGame);
            document.getElementById('start_over').addEventListener('click', DrawIntro); 
            
            function Tick(){ 
                game.time--;
                document.getElementById('counter').innerText=game.time;

                if(game.time <= 0)                                       
                    GameOver();

            }

            function DrawIntro(){
                hideAllScreens();
                document.getElementById('intro').style.display='';                
                clearTimeout(timer);
            }

            function GameOver(){
                hideAllScreens();
                clearInterval(timer);
                document.getElementById('end').style.display='';  
                document.getElementById('counter').style.display='none';

                var score=0;
                for (var i=0;i<game.answers.length;i++){                        
                        if(game.answers[i]==quiz[i].answerIndex)
                                score++;                                                  
                }  

                document.getElementById('end_title').innerText='You scored ' + score +' out of ' + quiz.length; 

            }

            function nextQuestion(){                
                game.currentQuestion++; 

                if(game.currentQuestion==quiz.length)
                    GameOver();
                else
                    drawQuestion(quiz[game.currentQuestion]);
                
            }

            function StartGame(){   
                hideAllScreens();                
                document.getElementById('counter').style.display='';

                game.time=60;      
                game.currentQuestion=0;
                game.answers=[];
                
                drawQuestion(quiz[game.currentQuestion]);                                
                clearInterval(timer);
                timer=setInterval(Tick,1000);
            }

            function hideAllScreens(){
                document.getElementById('intro').style.display='none';
                document.getElementById('end').style.display='none';
                document.getElementById('question').style.display='none';                
            }

            function answerQuestion(e){                
                var answer=e.srcElement.getAttribute('i');
                game.answers.push(parseInt(answer));

                if(parseInt(answer)!=quiz[game.currentQuestion].answerIndex)
                    game.time=game.time-20;

                nextQuestion();
            }

            function drawQuestion(obj){                
                hideAllScreens();
                document.getElementById('question').style.display='';  
                document.getElementById('title').innerText=obj.question; 
                document.getElementById('options').innerHTML=''; 

                for(var i=0; i < obj.options.length; i++){
                    document.getElementById('options').innerHTML+='<button class="option" i="' + i + '">' + obj.options[i] + '</button><BR><BR>';
                }  

                var options = document.getElementsByClassName("option");
                for (var i = 0; i < options.length; i++) {
                    options[i].addEventListener('click',answerQuestion);
                }                

            }
