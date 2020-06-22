includeHTML();
const selectPlan = async() => {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: {
            "Content-Type": "text/json"
        }
    }
    const response = await fetch(`./modules/select.php?age=${age.options[age.selectedIndex].value}`, options)
        //console.log(response)
    try { return await response.json() } catch (e) {
        console.log("erros" + e)

    }
}

//manipula o slide
let swiper = () => {
    new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

const planOptions = (data) => {
    const selectedPlan = document.getElementById("plan");
    const selectedAgeRange = document.getElementById("age")
    data = data.filter(plano => plano.age_range === selectedAgeRange.options[selectedAgeRange.selectedIndex].text)

    for (field of data) {
        let option = document.createElement('option');
        option.setAttribute("value", field.id)

        let value = document.createTextNode(field.name);
        option.appendChild(value);

        selectedPlan.appendChild(option)
        selectedPlan.setAttribute('class', 'options form-control')
    }

    if (selectedPlan.options.length > 0) {
        const selectedPlanID = selectedPlan.options[selectedPlan.selectedIndex].value
        planDetails(data.find(o => o.id === selectedPlanID))
    }
}

const planDetails = (data) => {
    let txtoperator = document.getElementById('operator')
    let txtprice = document.getElementById('price')
    let txtrefund = document.getElementById('refund')
    let txtmodality = document.getElementById('modality')

    txtoperator.innerHTML = "Operadora: "
    txtprice.innerHTML = "Preço: "
    txtrefund.innerHTML = "Reembolso: "
    txtmodality.innerHTML = "Modalidade: "

    let operator = document.createTextNode(data['operator']);
    let modality = document.createTextNode(data['modality']);
    let price = document.createTextNode(data['price']);
    let refund = document.createTextNode(data['refund']);

    txtoperator.appendChild(operator);
    txtmodality.appendChild(modality);
    txtprice.appendChild(price);
    txtrefund.appendChild(refund);
}


function limpaOption(dad, child) {
    let father = document.getElementById(dad);
    let son = father.querySelectorAll(child);

    if (son.length > 0) {
        son.forEach(option => {
            father.removeChild(option)
        })
    }
}

window.onload = () => {
    swiper();
    let age = document.querySelector("#age");
    let plan = document.getElementById("plan");

    age.addEventListener('change', async() => {
        const data = await selectPlan()

        limpaOption("plan", "option")
        planOptions(data)

        return data;
    });

    plan.addEventListener('change', async() => {
        const data = await selectPlan()

        const selectedPlan = document.getElementById("plan")
        const selectedPlanID = selectedPlan.options[selectedPlan.selectedIndex].value
        planDetails(data.find(o => o.id === selectedPlanID))

        return data;
    })
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}