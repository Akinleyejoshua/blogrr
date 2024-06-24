export const formatNumber = (n) => {
    try{
        n = parseInt(n);
        if (n < 1e3) return n;
        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
        if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
        if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
        
    } catch {
        return n;
    }
    
};

export const formatPostTitle = (title, slash) => {
    var result = "";
    if (slash){
        const split = title.split(" ");
        for (let i = 0; split.length > i; i++){
            result += `${split[i].replace(",", "")}${split.length - 1 != i ? "-": ""}`
        }

    } else {
        const split = title.split("-");
        for (let i = 0; split.length > i; i++){
            result += `${split[i]}${split.length - 1 != i ? " ": ""}`
        }
    }

    return result;
}

export const shortenText = (text, len) => {
    let result = ""
    for (let i = 0; len > i; i++){
        result += `${text[i]}`
        
    }
    return result + " ...";
}