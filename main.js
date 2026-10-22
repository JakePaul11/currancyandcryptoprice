const FIAT_API =
    "https://api.exchangerate-api.com/v4/latest/USD";

const CRYPTO_API =
    "https://api.coingecko.com/api/v3/simple/price";


let mode = "fiat";

let fiatRates = {};

let cryptoPrices = {};


const fiatCurrencies = {

    USD: {
        name: "US Dollar",
        flag: "🇺🇸",
        symbol: "$"
    },

    EUR: {
        name: "Euro",
        flag: "🇪🇺",
        symbol: "€"
    },

    UZS: {
        name: "Uzbek Som",
        flag: "🇺🇿",
        symbol: "so'm"
    },

    GBP: {
        name: "British Pound",
        flag: "🇬🇧",
        symbol: "£"
    },

    JPY: {
        name: "Japanese Yen",
        flag: "🇯🇵",
        symbol: "¥"
    },

    CNY: {
        name: "Chinese Yuan",
        flag: "🇨🇳",
        symbol: "¥"
    },

    KRW: {
        name: "South Korean Won",
        flag: "🇰🇷",
        symbol: "₩"
    },

    RUB: {
        name: "Russian Ruble",
        flag: "🇷🇺",
        symbol: "₽"
    },

    CAD: {
        name: "Canadian Dollar",
        flag: "🇨🇦",
        symbol: "C$"
    },

    AUD: {
        name: "Australian Dollar",
        flag: "🇦🇺",
        symbol: "A$"
    },

    CHF: {
        name: "Swiss Franc",
        flag: "🇨🇭",
        symbol: "CHF"
    },

    AED: {
        name: "UAE Dirham",
        flag: "🇦🇪",
        symbol: "د.إ"
    },

    TRY: {
        name: "Turkish Lira",
        flag: "🇹🇷",
        symbol: "₺"
    },

    INR: {
        name: "Indian Rupee",
        flag: "🇮🇳",
        symbol: "₹"
    }

};



const cryptocurrencies = {

    bitcoin: {
        code: "BTC",
        name: "Bitcoin",
        icon: "₿"
    },

    ethereum: {
        code: "ETH",
        name: "Ethereum",
        icon: "◆"
    },

    tether: {
        code: "USDT",
        name: "Tether",
        icon: "₮"
    },

    solana: {
        code: "SOL",
        name: "Solana",
        icon: "◎"
    },

    binancecoin: {
        code: "BNB",
        name: "BNB",
        icon: "◆"
    },

    ripple: {
        code: "XRP",
        name: "XRP",
        icon: "✕"
    },

    dogecoin: {
        code: "DOGE",
        name: "Dogecoin",
        icon: "Ð"
    },

    cardano: {
        code: "ADA",
        name: "Cardano",
        icon: "₳"
    }

};


/* =====================================
   DOM
===================================== */

const amountInput =
    document.getElementById("amount");

const fromSelect =
    document.getElementById("from-currency");

const toSelect =
    document.getElementById("to-currency");

const convertButton =
    document.getElementById("convertButton");

const swapButton =
    document.getElementById("swapButton");

const resultCard =
    document.getElementById("resultCard");

const loader =
    document.getElementById("loader");

const errorBox =
    document.getElementById("error");

const languageSelect =
    document.getElementById("language");


const translations = {

    en: {
        subtitle: "Currency & Crypto Converter",

        live: "Live rates",

        badge: "Live exchange rates",

        heroTitle:
            'Convert money <span>smarter.</span>',

        heroDescription:
            "Convert international currencies and popular cryptocurrencies with a clean and simple interface.",

        converterLabel:
            "CURRENCY CONVERTER",

        converterTitle:
            "Convert your money",

        amount:
            "Amount",

        from:
            "From",

        to:
            "To",

        convert:
            "Convert",

        loading:
            "Getting latest rates...",

        result:
            "CONVERTED AMOUNT",

        rate:
            "Exchange rate",

        updated:
            "Updated",

        justNow:
            "Just now",

        fiat:
            "Fiat",

        crypto:
            "Crypto",

        feature1:
            "Fast conversion",

        feature1Text:
            "Convert currencies in seconds.",

        feature2:
            "Crypto support",

        feature2Text:
            "Bitcoin, Ethereum, Solana and more.",

        feature3:
            "Live rates",

        feature3Text:
            "Rates retrieved from online APIs.",

        invalidAmount:
            "Please enter a valid amount.",

        apiError:
            "Could not retrieve exchange rates. Please try again."
    },


    uz: {
        subtitle:
            "Valyuta va Kripto Konvertor",

        live:
            "Jonli kurslar",

        badge:
            "Jonli valyuta kurslari",

        heroTitle:
            'Pulni <span>osonroq</span> aylantiring.',

        heroDescription:
            "Xalqaro valyutalar va mashhur kriptovalyutalarni tez va oson konvertatsiya qiling.",

        converterLabel:
            "VALYUTA KONVERTORI",

        converterTitle:
            "Pulingizni konvertatsiya qiling",

        amount:
            "Miqdor",

        from:
            "Qaysi valyutadan",

        to:
            "Qaysi valyutaga",

        convert:
            "Konvertatsiya",

        loading:
            "So'nggi kurslar olinmoqda...",

        result:
            "KONVERTATSIYA NATIJASI",

        rate:
            "Valyuta kursi",

        updated:
            "Yangilandi",

        justNow:
            "Hozirgina",

        fiat:
            "Valyuta",

        crypto:
            "Kripto",

        feature1:
            "Tez konvertatsiya",

        feature1Text:
            "Valyutalarni bir necha soniyada aylantiring.",

        feature2:
            "Kripto qo'llab-quvvatlash",

        feature2Text:
            "Bitcoin, Ethereum, Solana va boshqalar.",

        feature3:
            "Jonli kurslar",

        feature3Text:
            "Kurslar internet API orqali olinadi.",

        invalidAmount:
            "To'g'ri miqdor kiriting.",

        apiError:
            "Valyuta kurslarini olishda xatolik yuz berdi."
    },


    ru: {
        subtitle:
            "Конвертер валют и криптовалют",

        live:
            "Онлайн курсы",

        badge:
            "Актуальные курсы валют",

        heroTitle:
            'Конвертируйте <span>умнее.</span>',

        heroDescription:
            "Конвертируйте международные валюты и популярные криптовалюты быстро и удобно.",

        converterLabel:
            "КОНВЕРТЕР ВАЛЮТ",

        converterTitle:
            "Конвертируйте деньги",

        amount:
            "Сумма",

        from:
            "Из",

        to:
            "В",

        convert:
            "Конвертировать",

        loading:
            "Получаем актуальные курсы...",

        result:
            "РЕЗУЛЬТАТ",

        rate:
            "Курс обмена",

        updated:
            "Обновлено",

        justNow:
            "Только что",

        fiat:
            "Валюта",

        crypto:
            "Крипто",

        feature1:
            "Быстрая конвертация",

        feature1Text:
            "Конвертируйте валюты за секунды.",

        feature2:
            "Криптовалюты",

        feature2Text:
            "Bitcoin, Ethereum, Solana и другие.",

        feature3:
            "Онлайн курсы",

        feature3Text:
            "Курсы получаются через онлайн API.",

        invalidAmount:
            "Введите корректную сумму.",

        apiError:
            "Не удалось получить курсы валют."
    }

};


let currentLanguage = "en";


/* =====================================
   START
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadFiatRates();

        populateFiat();

        updateCurrencyIcons();

    }
);


/* =====================================
   LOAD FIAT
===================================== */

async function loadFiatRates() {

    try {

        const response =
            await fetch(FIAT_API);

        if (!response.ok) {
            throw new Error("API Error");
        }

        const data =
            await response.json();

        fiatRates =
            data.rates;

    } catch (error) {

        console.error(error);

        showError(
            translations[currentLanguage]
                .apiError
        );

    }

}



function populateFiat() {

    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";


    Object.keys(fiatCurrencies)
        .forEach(code => {

            if (!fiatRates[code]) {
                return;
            }


            const currency =
                fiatCurrencies[code];


            const fromOption =
                document.createElement("option");

            fromOption.value =
                code;

            fromOption.textContent =
                `${code} — ${currency.name}`;


            const toOption =
                document.createElement("option");

            toOption.value =
                code;

            toOption.textContent =
                `${code} — ${currency.name}`;


            fromSelect.appendChild(
                fromOption
            );

            toSelect.appendChild(
                toOption
            );

        });


    fromSelect.value = "USD";
    toSelect.value = "UZS";

}



function populateCrypto() {

    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";


    Object.entries(cryptocurrencies)
        .forEach(([id, crypto]) => {

            const optionFrom =
                document.createElement("option");

            optionFrom.value = id;

            optionFrom.textContent =
                `${crypto.code} — ${crypto.name}`;


            const optionTo =
                document.createElement("option");

            optionTo.value = id;

            optionTo.textContent =
                `${crypto.code} — ${crypto.name}`;


            fromSelect.appendChild(
                optionFrom
            );

            toSelect.appendChild(
                optionTo
            );

        });


    fromSelect.value =
        "bitcoin";

    toSelect.value =
        "ethereum";

}



document
    .querySelectorAll(".type-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".type-button"
                    )
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );


                button.classList.add(
                    "active"
                );


                mode =
                    button.dataset.type;


                resultCard.classList.add(
                    "hidden"
                );


                if (mode === "fiat") {

                    populateFiat();

                } else {

                    populateCrypto();

                }


                updateCurrencyIcons();

            }
        );

    });



convertButton.addEventListener(
    "click",
    convertCurrency
);


async function convertCurrency() {

    const amount =
        parseFloat(
            amountInput.value
        );


    if (
        isNaN(amount) ||
        amount <= 0
    ) {

        showError(
            translations[currentLanguage]
                .invalidAmount
        );

        return;
    }


    hideError();

    showLoader();


    try {

        if (mode === "fiat") {

            convertFiat(amount);

        } else {

            await convertCrypto(
                amount
            );

        }

    } catch (error) {

        console.error(error);

        showError(
            translations[currentLanguage]
                .apiError
        );

    } finally {

        hideLoader();

    }

}



function convertFiat(amount) {

    const from =
        fromSelect.value;

    const to =
        toSelect.value;


    const fromRate =
        fiatRates[from];

    const toRate =
        fiatRates[to];


    const converted =
        (amount / fromRate) *
        toRate;


    const rate =
        toRate / fromRate;


    displayResult(
        amount,
        converted,
        from,
        to,
        rate
    );

}


async function convertCrypto(amount) {

    const from =
        fromSelect.value;

    const to =
        toSelect.value;


    const ids =
        `${from},${to}`;


    const response =
        await fetch(
            `${CRYPTO_API}?ids=${ids}&vs_currencies=usd`
        );


    if (!response.ok) {

        throw new Error(
            "Crypto API error"
        );

    }


    const data =
        await response.json();


    const fromPrice =
        data[from].usd;

    const toPrice =
        data[to].usd;


    const converted =
        (amount * fromPrice) /
        toPrice;


    const rate =
        fromPrice / toPrice;


    displayResult(
        amount,
        converted,
        cryptocurrencies[from].code,
        cryptocurrencies[to].code,
        rate
    );

}



function displayResult(
    amount,
    converted,
    from,
    to,
    rate
) {

    document.getElementById(
        "originalAmount"
    ).textContent =
        `${formatNumber(amount)} ${from}`;


    document.getElementById(
        "convertedAmount"
    ).textContent =
        `${formatNumber(converted)} ${to}`;


    document.getElementById(
        "exchangeRate"
    ).textContent =
        `1 ${from} = ${formatNumber(rate)} ${to}`;


    document.getElementById(
        "updatedTime"
    ).textContent =
        translations[currentLanguage]
            .justNow;


    resultCard.classList.remove(
        "hidden"
    );

}


function formatNumber(number) {

    if (number >= 1000) {

        return number.toLocaleString(
            undefined,
            {
                maximumFractionDigits: 2
            }
        );

    }


    if (number < 0.01) {

        return number.toLocaleString(
            undefined,
            {
                maximumFractionDigits: 8
            }
        );

    }


    return number.toLocaleString(
        undefined,
        {
            maximumFractionDigits: 4
        }
    );

}



swapButton.addEventListener(
    "click",
    () => {

        const oldFrom =
            fromSelect.value;

        fromSelect.value =
            toSelect.value;

        toSelect.value =
            oldFrom;


        updateCurrencyIcons();


        swapButton.animate(
            [
                {
                    transform:
                        "rotate(0deg)"
                },

                {
                    transform:
                        "rotate(180deg)"
                }
            ],

            {
                duration: 300
            }
        );

    }
);



fromSelect.addEventListener(
    "change",
    updateCurrencyIcons
);

toSelect.addEventListener(
    "change",
    updateCurrencyIcons
);


function updateCurrencyIcons() {

    const fromIcon =
        document.getElementById(
            "fromIcon"
        );

    const toIcon =
        document.getElementById(
            "toIcon"
        );


    if (mode === "fiat") {

        fromIcon.textContent =
            fiatCurrencies[
                fromSelect.value
            ]?.flag || "💵";


        toIcon.textContent =
            fiatCurrencies[
                toSelect.value
            ]?.flag || "💵";


        document.getElementById(
            "amountSymbol"
        ).textContent =
            fiatCurrencies[
                fromSelect.value
            ]?.symbol || "$";

    } else {

        fromIcon.textContent =
            cryptocurrencies[
                fromSelect.value
            ]?.icon || "₿";


        toIcon.textContent =
            cryptocurrencies[
                toSelect.value
            ]?.icon || "₿";


        document.getElementById(
            "amountSymbol"
        ).textContent =
            cryptocurrencies[
                fromSelect.value
            ]?.icon || "₿";

    }

}



amountInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            convertCurrency();

        }

    }
);



languageSelect.addEventListener(
    "change",
    event => {

        currentLanguage =
            event.target.value;

        changeLanguage();

    }
);


function changeLanguage() {

    const t =
        translations[currentLanguage];


    document.getElementById(
        "subtitle"
    ).textContent = t.subtitle;


    document.getElementById(
        "liveText"
    ).textContent = t.live;


    document.getElementById(
        "heroBadge"
    ).textContent = t.badge;


    document.getElementById(
        "heroTitle"
    ).innerHTML = t.heroTitle;


    document.getElementById(
        "heroDescription"
    ).textContent =
        t.heroDescription;


    document.getElementById(
        "converterLabel"
    ).textContent =
        t.converterLabel;


    document.getElementById(
        "converterTitle"
    ).textContent =
        t.converterTitle;


    document.getElementById(
        "amountLabel"
    ).textContent = t.amount;


    document.getElementById(
        "fromLabel"
    ).textContent = t.from;


    document.getElementById(
        "toLabel"
    ).textContent = t.to;


    document.getElementById(
        "convertText"
    ).textContent = t.convert;


    document.getElementById(
        "loadingText"
    ).textContent = t.loading;


    document.getElementById(
        "resultLabel"
    ).textContent = t.result;


    document.getElementById(
        "rateLabel"
    ).textContent = t.rate;


    document.getElementById(
        "updatedLabel"
    ).textContent = t.updated;


    document.getElementById(
        "fiatButton"
    ).textContent = t.fiat;


    document.getElementById(
        "cryptoButton"
    ).textContent = t.crypto;


    document.getElementById(
        "featureOneTitle"
    ).textContent = t.feature1;


    document.getElementById(
        "featureOneText"
    ).textContent = t.feature1Text;


    document.getElementById(
        "featureTwoTitle"
    ).textContent = t.feature2;


    document.getElementById(
        "featureTwoText"
    ).textContent = t.feature2Text;


    document.getElementById(
        "featureThreeTitle"
    ).textContent = t.feature3;


    document.getElementById(
        "featureThreeText"
    ).textContent = t.feature3Text;

}



function showLoader() {

    loader.classList.remove(
        "hidden"
    );

    resultCard.classList.add(
        "hidden"
    );

}


function hideLoader() {

    loader.classList.add(
        "hidden"
    );

}


function showError(message) {

    hideLoader();

    errorBox.textContent =
        message;

    errorBox.classList.remove(
        "hidden"
    );

}


function hideError() {

    errorBox.classList.add(
        "hidden"
    );

}