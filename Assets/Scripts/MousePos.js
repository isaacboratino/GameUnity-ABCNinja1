#pragma strict
var ball :GameObject;
var check:float;

function Start () {

}

private var hits:RaycastHit[];
		var hit :RaycastHit;
private var ray :Ray;

		var slashSound:AudioSource;

function Update () 
{
	
	if (PrincipalMainCamera.gamePlayning)
	{
		if(Input.GetMouseButton(0))
		{
			var mousex : float = Input.GetAxis("Mouse X");
		    var mousey : float = Input.GetAxis("Mouse Y");
		 
		    if (mousex > 0.2)
		    {
		    	if(!slashSound.isPlaying)
					slashSound.Play();
		    }
		    else if (mousex < -0.2)
		    {
		    	if(!slashSound.isPlaying)
					slashSound.Play();
		    }
		    else
		    {
		    	slashSound.Stop();
		    }
		
			Pos();
		}	
	}
}

function Pos() 
{
	
	ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	
	//Debug.DrawRay(Camera.main.transform.position, ray.direction, Color(255,0,0,255));
	hits = Physics.RaycastAll(Camera.main.transform.position, ray.direction, 50);
	
	for	(var i = 0; i < hits.Length; i++)
	{
		hit = hits[i];
		if (hit.collider.tag == "screen")
		{
			//audio.PlayOneShot(slashSound);			
			ball.transform.position = hit.point;
		}
	}
	
}