const MODEL_URL = "https://teachablemachine.withgoogle.com/models/MszFwJEKL/";
let modelo, inputImage, labelContainer, resultContainer, maxPredictions, maxClass;

window.onload = async () => {
    await init();
}

async function init(){
    const modelURL = MODEL_URL + 'model.json';
    const metadataURL = MODEL_URL + 'metadata.json';
    modelo = await tmImage.load(modelURL, metadataURL);

    maxPredictions = modelo.getTotalClasses();

    labelContainer = document.getElementById('result-container')

    document.getElementById('image-upload').addEventListener('change', carregarImagem); 
}

function carregarImagem() {
    let image = document.getElementById("image-upload").files[0];
    let imagePreview = document.getElementById('image-preview');
    imagePreview.src = URL.createObjectURL(image);

    imagePreview.onload = async () => {
        imagePreview.width = 300;
        imagePreview.height = 300;

        document.getElementById("input-container").innerHTML = '';
        document.getElementById("input-container").appendChild(imagePreview)

        classificarImagem(imagePreview);
    }
}


async function classificarImagem(image) {
    labelContainer.innerHTML = '';
    const prediction = await modelo.predict(image);
    let maxProbability = -1;
    let maxClass = null;
    for(let i = 0; i < maxPredictions; i++){

        if(prediction[i].className === "Vingadores"){
            const numberBar1 = prediction[i].probability * 100
            const numberBar1Txt = String(numberBar1); 
            const bar1 = document.getElementById("bar-vingadores")           
           
            const prob1 = document.getElementById('prob1')

            bar1.style.width = numberBar1Txt + "%";
           
            prob1.innerHTML = numberBar1.toFixed(2) + "%"

        }
        if(prediction[i].className === "Liga da Justiça"){
            const numberBar2 = prediction[i].probability * 100
            const numberBar2Txt = String(numberBar2);
            const prob2 = document.getElementById('prob2') 
            const bar2 = document.getElementById("bar-liga-da-justica")
           
            bar2.style.width = numberBar2Txt + "%";
            prob2.innerHTML = numberBar2.toFixed(2) + "%"
            
        }
        if(prediction[i].className === "Anti-Herói"){
            const numberBar3 = prediction[i].probability * 100
            const numberBar3Txt = String(numberBar3); 
            const bar3 = document.getElementById("bar-anti-heroi")
            const prob3 = document.getElementById('prob3') 
          
            
            bar3.style.width = numberBar3Txt + "%";
            prob3.innerHTML = numberBar3.toFixed(2) + "%"
            
        }
        if (prediction[i].probability > maxProbability) {
            maxProbability = prediction[i].probability;
            maxClass = prediction[i].className;
        }
        switch(prediction[i] && prediction[i].className && prediction[i].probability){
            case "Vingadores":
                const imgClasse = document.getElementById('img-classe');
                imgClasse.src = "anti-heroi-Logo.png"
                break
            case "Liga da Justiça":
                const imgClasse2 = document.getElementById('img-classe');
                imgClasse2.src = "anti-heroi-Logo.png";
                break
            case "Anti-Herói":
                const imgClasse3 = document.getElementById('img-classe');
                imgClasse3.src = "anti-heroi-Logo.png";
                break
        }
    }
}


