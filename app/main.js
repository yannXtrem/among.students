document.addEventListener('DOMContentLoaded', () => {
    // Appliquer les couleurs du thème Telegram
    const themeParams = Telegram.WebApp.themeParams;
    document.body.style.backgroundColor = themeParams.bg_color || '#ffffff';
    document.body.style.color = themeParams.text_color || '#000000';
    
    const model = new Model();
    const view = new View();
    const controller = new Controller(model, view);
});
