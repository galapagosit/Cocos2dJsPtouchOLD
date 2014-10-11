var res = {
    FontAbduction : "res/fonts/Abduction.ttf",
    UiIndex_json : "res/PtouchUi/index.json",
    UiMenu_json  : "res/PtouchUi/menu.json",
    UiStage_json : "res/PtouchUi/stage.json",
    UiField_json : "res/PtouchUi/field.json",
    UiAdultsConfirmModal_json : "res/PtouchUi/adults_confirm_modal.json",
    UiInfoModal_json : "res/PtouchUi/info_modal.json",
    UiCommonScrollSheet_json : "res/PtouchUi/common_scroll_sheet.json",
    AnimationBear_json : "res/Animation/Animals/Bear/Bear.ExportJson",
    AnimationPanda_json : "res/Animation/Animals/Panda/Panda.ExportJson",
    Bear_mp3 : "res/sound/Animals/bear.mp3"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
