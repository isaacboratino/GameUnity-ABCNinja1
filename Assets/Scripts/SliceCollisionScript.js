#pragma strict

private var check  :float;
private var childs :Component[];

		var hitSound       		:AudioSource;
		var hitFinishSound 		:AudioSource;
		var letterStrong   		:Number;
		var letterScoreValue	:Number;
		var hitParticle			:GameObject;
		var hitParticleFinish	:GameObject;		
		var scorePointText		:GUIText;
		var scorePointTextBack	:GameObject;

function Start () {
	childs = gameObject.GetComponentsInChildren(Transform);
}

function Update () {
		
	if (gameObject.transform.position.y < 14f )
	{
		Destroy(gameObject,0.5);
	}
	
	if(Input.GetMouseButton(0))
	{
		check = 1;
	}
	
	if (Input.GetMouseButtonUp(0))
	{
		check = 0;
	}
}

function OnTriggerEnter (other : Collider)
{
	if (PrincipalMainCamera.gamePlayning)
	{
		if (check == 1)
		{
			if (other.tag == "mousePointer")
			{
				
				var theClonedParticle : GameObject; 
				
				// Verifica quantas batidas o objeto precisa ate cortar
				letterStrong--;
				if (letterStrong <= 0) 
				{
					// Permite a animação das partes do objeto
					gameObject.rigidbody.isKinematic = true;
					gameObject.collider.isTrigger = true;			
									
					// Faz efeito de corte com particulas
			        theClonedParticle = Instantiate(hitParticleFinish, transform.position, transform.rotation); 
			        //theClonedParticle.particleEmitter.emit = true;
					Destroy(theClonedParticle, 0.5);
					
					// Faz aparecer texto com pontuação				
					var theClonedText : GUIText;					
					theClonedText = Instantiate(scorePointText, 
												Vector3((Input.mousePosition.x/Screen.width)-0.04,
														(Input.mousePosition.y/Screen.height)+0.11,
														0),
												transform.rotation);											
					theClonedText.text = letterScoreValue.ToString();
					Destroy(theClonedText, 0.4);
					
					var theClonedTextBack : GameObject;					
					theClonedTextBack = Instantiate(scorePointTextBack, 
													Vector3((Input.mousePosition.x/Screen.width),
															(Input.mousePosition.y/Screen.height)+0.1,
															0),
													transform.rotation);															
					Destroy(theClonedTextBack, 0.4);
					
					// Emite som 
					hitFinishSound.Play();												
					
					// Da pontuação ao score pelo objeto cortada
					PrincipalMainCamera.IncrementScore(letterScoreValue);
					
					// Ativa animação as partes cortadas do objeto
					for (var i = 0; i < childs.Length; i++)
					{				
						childs[i].rigidbody.isKinematic = false;
						childs[i].collider.isTrigger = false;
						childs[i].rigidbody.AddRelativeForce(Random.Range(0,1),Random.Range(0,1),Random.Range(-10,10));						
					}
				}
				else
				{
					// Faz efeito de batida com particulas				
			        theClonedParticle = Instantiate(hitParticle, transform.position, transform.rotation); 
			        theClonedParticle.particleEmitter.emit = true;
					Destroy(theClonedParticle, 0.5);
					
					gameObject.rigidbody.AddForce(Vector3(Random.Range(-200,200),
														  Random.Range(-200,200),
														  0));
														  
					gameObject.rigidbody.AddTorque(Random.Range(-80f,80f),
												   Random.Range(-80f,80f),
												   Random.Range(-80f,80f));
							
					// Emite som 
					hitSound.Play();
				}
			}
		}		
	}
}