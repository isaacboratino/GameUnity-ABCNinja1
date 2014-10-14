#pragma strict
		
private var abcArray	  			:Array;		
		var A						:GameObject;
		var B						:GameObject;		
		var C						:GameObject;
		var D						:GameObject;
		var E						:GameObject;		
		var F						:GameObject;
		var G						:GameObject;
		var H						:GameObject;		
		var I						:GameObject;
		var J						:GameObject;
		var K						:GameObject;		
		var L						:GameObject;
		var M						:GameObject;
		var N						:GameObject;		
		var O						:GameObject;
		var P						:GameObject;
		var Q						:GameObject;		
		var R						:GameObject;
		var S						:GameObject;
		var T						:GameObject;		
		var U						:GameObject;
		var V						:GameObject;
		var W						:GameObject;		
		var X						:GameObject;
		var Y						:GameObject;		
		var Z						:GameObject;

private var coringaArray  			:Array;			
		var coringa01				:GameObject;
				
		var screen					:GameObject;
		var velocity				:float;
		var torqueVariation 		:float;		
private var torqueVariationNegative :float;

private var nt			:float;
private var bt			:float;
private	var dnVector	:Vector3;
private	var upVector	:Vector3;
private var objCopy 	:GameObject;

// Auxiliares GUI
private var minutes     :Number;
private var seconds     :Number;
private var myTimer		:float;
		var guiFontStyle:GUIStyle;
		var bonusSound  :AudioSource;

	   var telaSound  	:AudioSource;
static var gamePlayning :boolean;

// Configurações da tela do jogo
// Easy;30, Normal:20, Hard:7
private var dificuldadeTela:Number = 30;

// Pontos para passar de faze
 static	var visibleScore:Number;
private var pontosFaseArray:Array;
private var passouFase	   :boolean = false;
private var tipoTrofeu	   :String;

private var trofeuArray	   :Array;
		var trofeuBronze   :Texture2D;
		var trofeuPrata    :Texture2D;
		var trofeuOuro     :Texture2D;
		var trofeuplatina  :Texture2D;
private var trofeuGanho    :Texture2D;

function Start () 
{
	nt = Time.time;
	bt = nt;
	
	gamePlayning = true;
	telaSound.Play();
	
	// Variavel para fazer contagem regressiva em segundos
	myTimer = 120.0f;
	
	torqueVariationNegative = torqueVariation*-1;	
	
	// Configura pontos para se passar de tela
	pontosFaseArray = new Array(4);
	pontosFaseArray[0] = 10000; // Bronze
	pontosFaseArray[1] = 11000; // Prata
	pontosFaseArray[2] = 12000; // Ouro
	pontosFaseArray[3] = 13000; // Platina
	
	// Configura os trofeus
	trofeuArray = new Array(4);
	trofeuArray[0] = trofeuBronze; // Bronze
	trofeuArray[1] = trofeuPrata; // Prata
	trofeuArray[2] = trofeuOuro; // Ouro
	trofeuArray[3] = trofeuplatina; // Platina
	
	// Configura letras para serem cortadas
	abcArray = new Array(26);
	abcArray[0] = A;
	abcArray[1] = B;
	abcArray[2] = C;
	abcArray[3] = D;
	abcArray[4] = E;
	abcArray[5] = F;
	abcArray[6] = G;
	abcArray[7] = H;
	abcArray[8] = I;
	/*abcArray[9] = J;
	abcArray[10] = K;
	abcArray[11] = L;
	abcArray[12] = M;
	abcArray[13] = N;
	abcArray[14] = O;
	abcArray[15] = P;
	abcArray[16] = Q;
	abcArray[17] = R;
	abcArray[18] = S;
	abcArray[19] = T;
	abcArray[20] = U;
	abcArray[21] = V;
	abcArray[22] = W;
	abcArray[23] = X;
	abcArray[24] = Y;
	abcArray[25] = Z;*/

	coringaArray = new Array(1);
	coringaArray[0] = coringa01;
}

function Update () 
{
	
	if (gamePlayning)
	{
		nt = Time.time;
		
		if ((nt-bt) >= velocity)
		{
			bt = nt;
			
			/*if (Screen.width >= 1024) 
			{
				dnVector.x = Random.Range(335f,365f);		
			}
			else if (Screen.width <= 400) 
			{
				dnVector.x = Random.Range(347f,353f);		
			}*/
			
			dnVector.x = Random.Range(335f,365f);
			dnVector.y = 14f;
			dnVector.z = 179f;			
			
			var numberVariacaoCoringa:Number = Random.Range(0,10);			
			
			// Faço uma validação para utilizar o coringa
			if (numberVariacaoCoringa == 2)
			{			
				objCopy = GameObject.Instantiate(coringaArray[0], dnVector, Quaternion(0,180,0,0));
			}
			else
			{	
				objCopy = GameObject.Instantiate(abcArray[Random.Range(0,9)], dnVector, Quaternion(0,180,0,0));
			}
	
			objCopy.rigidbody.isKinematic = false;	
			
			upVector.x = Random.Range(-100f,100f);		
			upVector.y = Random.Range(750f,1000f);
			
			objCopy.rigidbody.AddForce(upVector);
			objCopy.rigidbody.AddTorque(Random.Range(torqueVariationNegative,torqueVariation),Random.Range(torqueVariationNegative,torqueVariation),Random.Range(torqueVariationNegative,torqueVariation));
		}
		
		/***** Conagem regressival ****/
		if(myTimer > 0) {
		    myTimer -= Time.deltaTime;
		    minutes = Mathf.FloorToInt(myTimer / 60F);
		    seconds = Mathf.FloorToInt(myTimer - minutes * 60);
	    }
	    else if(myTimer <= 0)
		{
			gamePlayning = false;
		}
    }
}

function OnGUI () 
{
    GUILayout.BeginArea( Rect( 10, 10, Screen.width / 4, Screen.height / 4 ) );        
    GUILayout.Box( "Pontos: " + visibleScore, guiFontStyle );    
    GUILayout.EndArea ();
    
    // Se estiver acabando o tempo e faltando 10 segundos, fazer ações
    var outroEstilo:GUIStyle = guiFontStyle;
    if(gamePlayning && minutes == 0 && seconds < 6)
    {
    	outroEstilo = new GUIStyle(guiFontStyle);
    	outroEstilo.normal.textColor = Color.red;
    	velocity = 0.01f;
    	
    	// Mostrar a mensagem BONUS e tocar uma musica diferente-
    	if(seconds <= 6 && seconds >= 1)
    	{	
    		if (!bonusSound.isPlaying)
    		{
    			telaSound.Stop();
    			bonusSound.Play();
    		}
    		
    		var bonusEstilo:GUIStyle = new GUIStyle(outroEstilo);
    		//bonusEstilo.normal.background = null;    		
    		bonusEstilo.fontSize = 60;
    	
    		GUILayout.BeginArea( Rect( Screen.width/2 -160, Screen.height/2-50 , 400, 120 ) );        
	    	GUILayout.Box( "!!! BONUS !!!", bonusEstilo);
	    	GUILayout.EndArea ();
	    }
    }
    else if(!gamePlayning && tipoTrofeu == null)
	{
		gamePlayning = false;
		minutes = 0;
		seconds = 0;
			
		for(var i = 0; i < pontosFaseArray.length; i++) {
			if (visibleScore >= Number.Parse(pontosFaseArray[i].ToString())) {
				passouFase = true;
				trofeuGanho = trofeuArray[i];
				switch(i) 
				{
					case 0: tipoTrofeu = "Bronze"; break;
					case 1: tipoTrofeu = "Prata"; break;
					case 2: tipoTrofeu = "Ouro"; break;
					case 3: tipoTrofeu = "Platina"; break;
					default: tipoTrofeu = "Nenhum"; break;
				}
			}
		}			
	}
    var sEstilo:GUIStyle;
    if (!gamePlayning && passouFase)
	{
		sEstilo = new GUIStyle(guiFontStyle);
		sEstilo.normal.background = trofeuGanho;
		sEstilo.normal.textColor = Color.magenta;
		sEstilo.wordWrap = true;		
		sEstilo.fontSize = 40;
		
		GUILayout.BeginArea( Rect( Screen.width/2 -160, Screen.height/2-50 , 400, 400 ) );        
    	GUILayout.Box( "PARABÉNS !!! VOCE FEZ "+visibleScore+" PONTOS, SEU TROFEU É "+tipoTrofeu, sEstilo);
    	GUILayout.EndArea ();
	}
	else if (!gamePlayning)
	{
		sEstilo = new GUIStyle(guiFontStyle);
		sEstilo.normal.background = trofeuGanho;
		sEstilo.wordWrap = true;
		sEstilo.normal.textColor = Color.red;
		sEstilo.fontSize = 40;
	
		GUILayout.BeginArea( Rect( Screen.width/2 -160, Screen.height/2-50 , 400, 400 ) );        
    	GUILayout.Box( ":( É UMA PENA MAS VOCÊ PERDEU "+tipoTrofeu, sEstilo);
    	GUILayout.EndArea ();
	}		
    
    GUILayout.BeginArea( Rect( Screen.width - (Screen.width / 4) - 10, 10, Screen.width / 4, Screen.height / 4 ) );        
    GUILayout.Box("Tempo: " + minutes + ":" + seconds, outroEstilo);
    GUILayout.EndArea();

}

static function IncrementScore ( i : Number ) {
    visibleScore += i;
}