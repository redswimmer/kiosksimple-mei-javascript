var MEICashPlugin = null;
//This example uses jQuery, wait until the document has finished loading. 
$(document).ready(function () {
    //This reaches out to KioskSimple and requests API initialization
    try{
        window.external.KioskSimpleAPIInit();
        $("#btnCashInStart").prop('disabled', false);
    }
    catch (err) {

        //If we got here then we are not running within KioskSimple, lets disable all buttons and output to user
        $("#btnCashInStart").prop('disabled', true);
        $("#btnCashInEnd").prop('disabled', true);
        outputActionResult("Initialization", "Something went wrong intitializing KioskSimple. Error:" + err)
        return;
    }
    //If we got this far, we are successfully running within KioskSimple's local code domain
    if (K()) {
        //These are the only handlers most applications need and will fire for any transaction funds event from any money plugins.
        KioskSimple.Plugins.GetPlugin('Bank').OnCreditChanged = KSCreditChanged;
        KioskSimple.Plugins.GetPlugin('Bank').OnCreditAdded = KSCreditAdded;
        KioskSimple.Plugins.GetPlugin('Bank').OnDeviceEvent = KSDeviceEvent;
        KioskSimple.Plugins.GetPlugin('Bank').OnPaymentError = KSPaymentError;
       // KioskSimple.Plugins.GetPlugin('Bank').OnPaymentComplete = OnPaymentComplete;


        //These handlers are distinct to the MEI EBDS plugin, these are used when more information about the MEi plugin 
        //operations are desired diretly from the plugin. Most of these will also be delivered via the OnDeviceEvent in a generic handler.
        MEICashPlugin = KioskSimple.Plugins.GetPlugin("MeiEBDS");
        if (MEICashPlugin != null) {
       
            MEICashPlugin.OnBillInserted = BillInserted;
            MEICashPlugin.OnBillRejected = BillRejected;
            MEICashPlugin.OnInfoMessage = InfoMessage;
            MEICashPlugin.OnErrorRaised = ErrorRaised;
            MEICashPlugin.OnEscrowRaised = EscrowRaised;
            MEICashPlugin.OnCashBoxAttached = CashBoxAttached;
            MEICashPlugin.OnCheated = Cheated;
            MEICashPlugin.OnJamDetected = JamDetected;
            MEICashPlugin.OnJamCleared = JamCleared;
            MEICashPlugin.OnStallDetected = StallDetected;
            MEICashPlugin.OnStallCleared = StallCleared;
            MEICashPlugin.OnStackerFull = StackerFull;
        }

        setupUIButtons();
    }

});

function OnPaymentComplete(a,b,c,d,e) {
    var output = new Object();
    output.a = a;
   output.b = b;
   output.c = c;
   output.d = d;
   output.e = e;
    outputActionResult("KSCreditAdded", "result:" + JSON.stringify(output))
}

//Not 100% needed but a nice shortcut to determine if KS is preset.
function K() {
    return !(typeof KioskSimple === 'undefined')
}

//KS Credit Changed Handler. Whenever credit changes in the KioskSImple instance. This handler will fire off. 
function KSCreditChanged(amount) {
    $("#currentCredit").html(amount);
}

function KSCreditAdded(amount,plugin,device) {
    var output = new Object();
    output.amount = amount;
    output.plugin = plugin;
    output.device = device;
    outputActionResult("KSCreditAdded", "result:" + JSON.stringify(output))
}

function KSDeviceEvent(deviceID, data, type, eventName, plugin, device) {
    var output = new Object();
    output.deviceID = deviceID;
    output.data = data;
    output.type = type;
    output.eventName = eventName;
    output.plugin = plugin;
    output.device = device;
    outputActionResult("KSDeviceEvent", "result:" + JSON.stringify(output))
}

function KSPaymentError(type, data, plugin, device) {
    var output = new Object();
    output.data = data;
    output.type = type;
    output.plugin = plugin;
    output.device = device;
    outputActionResult("KSPaymentError", "result:" + JSON.stringify(output))
}

function BillInserted(serial, description, amount, message) {

    var output = new Object();
    output.serial = serial;
    output.description = description;
    output.amount = amount;
    output.message = message;
    outputActionResult("BillInserted", "result:" + JSON.stringify(output))

}

function EscrowRaised(serial, description, amount, message) {

    var output = new Object();
    output.serial = serial;
    output.description = description;
    output.amount = amount;
    output.message = message;
    outputActionResult("EscrowRaised", "result:" + JSON.stringify(output))

}

function BillRejected(serial, description, amount, message) {

    var output = new Object();
    output.serial = serial;
    output.description = description;
    output.amount = amount;
    output.message = message;
    outputActionResult("BillRejected", "result:" + JSON.stringify(output))

}


function InfoMessage(serial, description, message) {

    var output = new Object();
    output.serial = serial;
    output.description = description;
    output.message = message;
    outputActionResult("InfoMessage", "result:" + JSON.stringify(output))

}

function ErrorRaised(serial, description, message) {

    var output = new Object();
    output.serial = serial;
    output.description = description;
    output.message = message;
    outputActionResult("ErrorRaised", "result:" + JSON.stringify(output))

}


function CashBoxAttached(serial, description, message) {

    var output = new Object();
    output.serial = serial;
    output.description = description;
    output.message = message;
    outputActionResult("CashBoxAttached", "result:" + JSON.stringify(output))

}

function Cheated(serial, description, message) {

    var output = new Object();
    output.serial = serial;
    output.description = description;
    output.message = message;
    outputActionResult("Cheated", "result:" + JSON.stringify(output))

}

function JamDetected(serial, description, message) {

    var output = new Object();
    output.serial = serial;
    output.description = description;
    output.message = message;
    outputActionResult("JamDetected", "result:" + JSON.stringify(output))

}

function JamCleared(serial, description, message) {

    var output = new Object();
    output.serial = serial;
    output.description = description;
    output.message = message;
    outputActionResult("JamCleared", "result:" + JSON.stringify(output))

}

function StallDetected(serial, description, message) {

    var output = new Object();
    output.serial = serial;
    output.description = description;
    output.message = message;
    outputActionResult("StallDetected", "result:" + JSON.stringify(output))

}

function StallCleared(serial, description, message) {

    var output = new Object();
    output.serial = serial;
    output.description = description;
    output.message = message;
    outputActionResult("StallCleared", "result:" + JSON.stringify(output))

}

function StackerFull(serial, description, message) {

    var output = new Object();
    output.serial = serial;
    output.description = description;
    output.message = message;
    outputActionResult("StackerFull", "result:" + JSON.stringify(output))

}




function setupUIButtons() {
    $("#btnCashInStart").click(function () {
        KioskSimple.Plugins.GetPlugin('_devices').EnableAllDevicesByCategory("BillAcceptor");
    });

    $("#btnCashInEnd").click(function () {
        KioskSimple.Plugins.GetPlugin('_devices').DisableAllDevicesByCategory("BillAcceptor");
    });
    
    $("#btnDetect").click(function () {
        KioskSimple.Plugins.GetPlugin('MeiEBDS').DetectDevice(0);
    });

  
}

function outputActionResult(actionName, data) {
    var output = "<a href='#' class='list-group-item'><h4 class='list-group-item-heading'>Action Result: " + actionName + "</h4><p class='list-group-item-text'>" + data + "</p></a>";
    $(".list-group").append(output);
}


