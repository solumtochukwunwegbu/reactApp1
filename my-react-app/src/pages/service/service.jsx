import "./service.css";

export default function Service() {
   
   function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          document.getElementById("latitude").value = lat;
          document.getElementById("longitude").value = lon;
          alert(`Location captured: ${lat}, ${lon}`);
        },
        function (error) {
          alert("Error getting location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  return (
        <div>
            <form action="submit">
                        <label htmlFor="TerminalID">Terminal ID</label>
                        <input type="text" name="TerminalID" id="TerminalID" />
                        <label htmlFor="MerchantName">Merchant Name</label>
                        <input type="text" name="MerchantName" id="MerchantName"/>
                        <label htmlFor="Address">Address</label>
                        <textarea name="Address" id="Address" rows="4" cols="50" placeholder="Enter your address here..."></textarea>

                        <label htmlFor="TerminalKey">Terminal Key</label>
                        <input type="text" name="TerminalKey" id="TerminalKey" />
                        <label>Phone: <input type="text" name="phone" required /></label><br />
                        <label>Application Name: <input type="text" name="appName" /></label><br />
                        <label>Application Version: <input type="text" name="appVersion" /></label><br />
                        <label>PTSP: <input type="text" name="ptsp" /></label><br />
                        <label>Terminal Serial: <input type="text" name="serial" /></label><br />
                        <label>Terminal Type: <input type="text" name="type" /></label><br />
                        <label>Terminal Model: <input type="text" name="model" /></label><br />

                        
                        <label>Connectivity Type:
                            <select name="connectivity">
                            <option value="">--Select--</option>
                            <option value="WIFI">WIFI</option>
                            <option value="GPRS">GPRS</option>
                            <option value="Data">Data</option>
                            </select>
                        </label><br />

                        <label>Sim Type/Network:
                            <select name="network">
                            <option value="">--Select--</option>
                            <option value="MTN">MTN</option>
                            <option value="AIRTEL">AIRTEL</option>
                            <option value="GLO">GLO</option>
                            <option value="9MOBILE">9MOBILE</option>
                            </select>
                        </label><br />

                        
          <input type="hidden" name="latitude" id="latitude" />
          <input type="hidden" name="longitude" id="longitude" />

        
          <label>Receipt Upload:
            <input type="file" name="receipt" accept="image/*" capture="environment" />
          </label><br />

        
          <label>Comment:
            <select name="comment" id="comment">
              <option value="">--Select--</option>
              <option>Damaged battery</option>
              <option>Terminal working fine with an approved transaction done</option>
              <option>Transaction declined</option>
              <option>Terminal has been retrieved by bank official</option>
              <option>Terminal has been retrieved by ptsp official</option>
              <option>Terminal had connectivity issues</option>
              <option>Terminal card slot has been damaged</option>
              <option>Terminal screen has been damaged</option>
              <option>Terminal sim slot has been damaged</option>
              <option>Terminal printer is damaged</option>
              <option>Terminal does not have paper roll</option>
              <option>Terminal charging port is bad</option>
              <option>Merchant not reachable</option>
              <option>Merchant don’t have charger</option>
              <option>Merchant location was difficult to locate</option>
              <option>Merchant complain of settlement</option>
              <option>Merchant not picking the call</option>
              <option>Merchant denied access to check terminal</option>
              <option>Terminal has been stolen</option>
              <option>Terminal has been damaged</option>
              <option>We are not the ptsp to the tid</option>
              <option value="Others">Others</option>
            </select>
          </label><br />


          <div id="otherCommentContainer">
              <label>Comment (Other):
                <textarea name="commentOther" rows="4" cols="50" placeholder="Enter additional details..."></textarea>
              </label>
          </div>


          
       <div className="form-buttons">
          <button type="button" onClick={getLocation}>Capture Location</button>
          <button type="submit">Submit</button>
       </div>


            </form>
        </div>
    );
}