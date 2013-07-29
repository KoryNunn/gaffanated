function gaffanate(){

	var gaffa = window.gaffa,
		crel = gaffa.crel,
		modelArea,
		infoContainer,
		eventsCountLabel,
        hidden = true,
        hideButton;

	function buildInspector(){
		var wrapper = crel('div', {'class':'gaffanated hidden'},
				modelArea = crel('textarea', {wrap:'off'}),
				infoContainer = crel('div',
					eventsCountLabel = crel('label', {'class':'eventsCount'}, 'Total model events triggered: 0'),
                    hideButton = crel('button', {'class':'hide'}, '_')
				)
			);

		modelArea.addEventListener('keyup', function (event) {
			var newModel;
			try{

				newModel = JSON.parse(modelArea.value);

			}catch(e){}

			if(newModel){
				gaffa.model.set(newModel);
			}

		});

        hideButton.addEventListener('click',function(){
            wrapper.classList[hidden?'remove':'add']('hidden');
            hidden = !hidden;
        });

		return wrapper;
	}

	var style = crel('link');

	document.body.appendChild(buildInspector());
	document.body.appendChild(style);

	style.setAttribute('rel', 'stylesheet');
	style.setAttribute('href', 'http://localhost:8081/gaffanated.css');

	function updateModelArea(){
		modelArea.value = JSON.stringify(gaffa.model.get(), null, '    ');	
	}

	function updateInspector(){
		updateModelArea();

		eventsCountLabel.innerText = 'Total model events triggered: ' + ++eventsCount;
	}

	var eventsCount = -1;

	gaffa.gedi.bind('[]', function(event){
		updateInspector();
	});

	updateInspector();
}
gaffanate();