The following is an example of how to use a MEI Single Note Bill Acceptor (EBDS protocol) from a local website in KioskSimple.  You could also incorporate the logic from this example into a website running on a remote web server, but for the purpose of this example we'll store the content locally.

Copy the contents of this folder to a location on your computer.  Make sure there are no spaces in the folder path (i.e. use "ExampleWebMeiBillAcceptor" not "Example Web Mei Bill Acceptor").

Configure KioskSimple to run the local example website
---- Start the KioskSimple configuration app.
---- Select the BROWSER left menu 
---- Select the BROWSER SETTINGS
---- Under Start-up Web Page enter the file path.  If for example I copied the contents to a folder on my desktop the file path could be "file:///c:/Users/Ryan/Desktop/ExampleWebMeiBillAcceptor/CashTest.html".  You must include the prefix "file:///" for local files.


Install the MEI Bill Acceptor Plugin and configure a bill acceptor. 
---- After the plugin is installed, a BILL ACCEPTORS menu items should be present on the left navigation pane. Select it. 
---- Select Mei Bill Acceptor Plugin from the list of installed plugins. 
---- Click 'Configure at the bottom of the screen
---- Make sure the Mei bill acceptor is attached to the machine. Click the 'ADD' button. 
-------- Enable the device
-------- In the serial port dropdown, select the port the device is connected to (might be a virtual serial port). Then click the DETECT button to confirm it's attached correctly.
-------- After the device has been detected, rename the device configuration if desired. This allows you to support multiple devices if you so desire.
-------- If another device is attached to the machine then click add again and set the com port and name and for as many device attached
-------- If you need to configure the device you can launch the included MEI configuration tool by clicking CONFIUGURE DEVICE.
---- Click Save and exit out of the KioskSimple Configuration app.
---- Start KioskSimple in Test Mode to test the example application.
