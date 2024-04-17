const planPriceData = {
    arcade: {
        monthly: 9,
        yearly: 90,
        monthsFree: 2,
    },
    advanced: {
        monthly: 12,
        yearly: 120,
        monthsFree: 2,
    },
    pro: {
        monthly: 15,
        yearly: 150,
        monthsFree: 2,
    },
}

const addonsPriceData = {
    onlineService: {
        monthly: 1,
        yearly: 10,
    },
    largerStorage: {
        monthly: 2,
        yearly: 20,
    },
    customizableProfile: {
        monthly: 2,
        yearly: 20,
    },
}

let selectedData = {
    plan: "arcade",
    addons: ["onlineService", "largerStorage", "customizableProfile"],
}

let stepNumList = document.querySelectorAll(".step-num")
let planList = document.querySelectorAll(".plan")
let contentList = document.querySelectorAll(".content")
let addonsList = document.querySelectorAll(".add-ons")
let toggleBtnThumb = document.querySelector(".billing-toggle-btn-thumb")
let stepIdx = 0


function evaluateTotalCharge() {
    let total = 0
    let isNoneAddonsChecked = true
    let isYearly = toggleBtnThumb.classList.contains("ml-auto")

    let planTitle = document.querySelector(".selected-plan-title")
    let planPrice = document.querySelector(".selected-plan-price")

    let selectedAddonsList = document.querySelectorAll(".selected-addons")

    let totalText = document.querySelector(".total-text")
    let totalPrice = document.querySelector(".total-price")

    if (isYearly) {
        planTitle.textContent = `${selectedData["plan"]} (Yearly)`
        planPrice.textContent = `$${planPriceData[selectedData["plan"]]["yearly"]}/yr`
        total += planPriceData[selectedData["plan"]]["yearly"]
    } else {
        planTitle.textContent = `${selectedData["plan"]} (Monthly)`
        planPrice.textContent = `$${planPriceData[selectedData["plan"]]["monthly"]}/mo`
        total += planPriceData[selectedData["plan"]]["monthly"]
    }

    for (let i = 0; i < addonsList.length; i++) {
        const element = addonsList[i];
        if (element.querySelector(".add-ons-checkbox").checked === true) {
            isNoneAddonsChecked = false
            selectedAddonsList[i].style.display = "flex"

            if (isYearly) {
                selectedAddonsList[i].querySelector(".selected-addons-price").textContent = `+$${addonsPriceData[selectedData["addons"][i]]["yearly"]}/yr`
                total += addonsPriceData[selectedData["addons"][i]]["yearly"]
            } else {
                selectedAddonsList[i].querySelector(".selected-addons-price").textContent = `+$${addonsPriceData[selectedData["addons"][i]]["monthly"]}/mo`
                total += addonsPriceData[selectedData["addons"][i]]["monthly"]
            }
        } else {
            selectedAddonsList[i].style.display = "none"
        }

    }

    if (isYearly) {
        totalText.textContent = `Total (per year)`
        totalPrice.textContent = `$${total}/yr`
    } else {
        totalText.textContent = `Total (per month)`
        totalPrice.textContent = `$${total}/mo`
    }

    if (isNoneAddonsChecked) {
        document.querySelector(".line-break").classList.add("hide")
        document.querySelector(".selected-addons-box").classList.add("hide")
    } else {
        document.querySelector(".line-break").classList.remove("hide")
        document.querySelector(".selected-addons-box").classList.remove("hide")
    }

}

function updateSelectedPlan(plan) {
    selectedData["plan"] = plan.querySelector(".plan-title").textContent.toLowerCase()
}

function updateContent(val) {
    for (let i = 0; i < contentList.length; i++) {
        const element = contentList[i]
        element.classList.add("hide")
    }
    contentList[val].classList.remove("hide")
}

function updateBtn(val, element) {
    if (val === 2 && element.classList.contains("next-step-btn")) {
        document.querySelector(".next-step-btn").style.display = "none"
        document.querySelector(".confirm-btn").style.display = "block"
    } else {
        document.querySelector(".next-step-btn").style.display = "block"
        document.querySelector(".confirm-btn").style.display = "none"
    }
}

function validateInput() {
    let nameInput = document.querySelector("#userName").value
    let nameErr = document.querySelector("#nameErr")

    let emailInput = document.querySelector("#userEmail").value
    let emailErr = document.querySelector("#emailErr")

    let phNumInput = document.querySelector("#userPhoneNumber").value
    let phNumErr = document.querySelector("#phoneNumErr")

    emailErr.style.display="none"
    phNumErr.style.display="none"

    if (nameInput === "") {
        nameErr.style.display = "inline"
        return false
    } else {
        nameErr.style.display = "none"
    }

    if (emailInput === "") {
        emailErr.textContent = `The field is required`
        emailErr.style.display = "inline"
        return false
    } else if (!emailInput.match(/^\S+@\S+\.\S+$/)) {
        emailErr.textContent = `Email address is invalid`
        emailErr.style.display = "inline"
        return false
    } else {
        emailErr.style.display = "none"

    }

    if (phNumInput === "") {
        phNumErr.textContent = `The field is required`
        phNumErr.style.display = "inline"
        return false
    } else if (!phNumInput.match(/^\d{10}$/)) {
        phNumErr.textContent = `Phone number is invalid`
        phNumErr.style.display = "inline"
        return false
    } else {
        phNumErr.style.display = "none"
    }

    return true
}

function updateSidebarCSS(val) {
    for (let i = 0; i < stepNumList.length; i++) {
        const element = stepNumList[i]
        if (element.classList.contains("step-active")) {
            element.classList.remove("step-active")
        }
    }
    stepNumList[val].classList.add("step-active")

    if (val === 0) {
        document.querySelector(".go-back-btn").style.display = "none";
    } else {
        document.querySelector(".go-back-btn").style.display = "block";
    }
}

function updatePlanCSS(val) {
    for (let i = 0; i < planList.length; i++) {
        const element = planList[i]
        if (element.classList.contains("plan-active")) {
            element.classList.remove("plan-active")
        }
        planList[val].classList.add("plan-active")
    }
}

function updateAddonsCSS() {
    for (let i = 0; i < addonsList.length; i++) {
        const element = addonsList[i]
        if (element.querySelector(".add-ons-checkbox").checked === true) {
            element.classList.add("add-ons-active")
        } else {
            element.classList.remove("add-ons-active")
        }
    }
}


document.querySelector(".next-step-btn").addEventListener("click", (e) => {
    updateBtn(stepIdx, e.target)

    if (stepIdx === 0) {
        let isInputValidated = validateInput()
        if (isInputValidated) {
            updateSidebarCSS(++stepIdx)
            updateContent(stepIdx)
        }
    } else if (stepIdx === 2) {
        evaluateTotalCharge()
        updateSidebarCSS(++stepIdx)
        updateContent(stepIdx)
    } else {
        if (stepIdx < 2) {
            updateSidebarCSS(++stepIdx)
            updateContent(stepIdx)
        }
    }
})

document.querySelector(".go-back-btn").addEventListener("click", (e) => {
    updateBtn(stepIdx, e.target)

    if (stepIdx >= 1) {
        updateSidebarCSS(--stepIdx)
        updateContent(stepIdx)
    }
})

document.querySelector(".billing-toggle-btn").addEventListener("click", (e) => {
    let planIdx = 0, addonsIdx = 0

    if (toggleBtnThumb.classList.contains("ml-auto")) {
        toggleBtnThumb.classList.remove("ml-auto")

        for (const key in planPriceData) {
            if (Object.hasOwnProperty.call(planPriceData, key)) {
                const element = planPriceData[key];
                planList[planIdx].querySelector(".plan-price").textContent = `$${element.monthly}/mo`
                planList[planIdx].querySelector(".plan-months-free").style.display = "none"
                planIdx++
            }
        }

        for (const key in addonsPriceData) {
            if (Object.hasOwnProperty.call(addonsPriceData, key)) {
                const element = addonsPriceData[key];
                addonsList[addonsIdx].querySelector(".add-ons-price").textContent = `+$${element.monthly}/mo`
                addonsIdx++
            }
        }

    } else {
        toggleBtnThumb.classList.add("ml-auto")

        for (const key in planPriceData) {
            if (Object.hasOwnProperty.call(planPriceData, key)) {
                const element = planPriceData[key];
                planList[planIdx].querySelector(".plan-price").textContent = `$${element.yearly}/yr`
                planList[planIdx].querySelector(".plan-months-free").style.display = "block"
                planList[planIdx].querySelector(".plan-months-free").textContent = `${element.monthsFree} months free`
                planIdx++
            }
        }

        for (const key in addonsPriceData) {
            if (Object.hasOwnProperty.call(addonsPriceData, key)) {
                const element = addonsPriceData[key];
                addonsList[addonsIdx].querySelector(".add-ons-price").textContent = `+$${element.yearly}/yr`
                addonsIdx++
            }
        }
    }

    document.querySelector(".monthly-text").classList.toggle("text-marine-blue")
    document.querySelector(".yearly-text").classList.toggle("text-marine-blue")
})


planList.forEach(function (plan, idx) {
    plan.addEventListener("click", () => {
        updatePlanCSS(idx)
        updateSelectedPlan(plan)
    })
})

addonsList.forEach(function (addons) {
    addons.addEventListener("click", () => {
        updateAddonsCSS()
    })
})

document.querySelector(".selected-plan-change-btn").addEventListener("click", () => {
    stepIdx = 1
    updateSidebarCSS(stepIdx)
    updateBtn(stepIdx, null)
    updateContent(stepIdx)
})

document.querySelector(".confirm-btn").addEventListener("click", (e) => {
    document.querySelector(".outlet-bottom-container").classList.add("hide")
    updateContent(4)
})


updateSidebarCSS(stepIdx)
updatePlanCSS(0)
updateAddonsCSS()
