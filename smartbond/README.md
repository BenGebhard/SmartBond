Github Repository https://github.com/BenGebhard/SmartBond.git

# SmartBond English Version

SmartBond is a smart contract that enables the issuance, trading, and management of bonds on the Ethereum blockchain.

## Functions

The SmartBond smart contract provides the following functions:

- **Initialization**: When using the SmartBond contract, various parameters need to be set, including the issuer's name, the issuer's address, the owner's name, the maturity date, the face value, the interest rate, and the payment frequency. This can be done in the script folder, and then open the deploy.js file.

- **Signing the Contract**: The issuer can sign the SmartBond contract by calling the `signBond` function, which should transfers the face value of the bond in Ether to the issuer's address.

- **Interest Payment**: The SmartBond contract enables the payment of interest to the owner of the bond. The `payInterestRate` function calculates and transfers the interest payment amount based on the face value and the specified interest rate.

- **Redeeming the Bond**: After reaching the maturity date, the bond owner can redeem the bond and receive the full nominal value. The `redeemBond` function redeems the bond by calculating the Ether equivalent of the face value and transferring it to the owner's address.

## Unfortunately the functions don´t work as intended and need to be revised to work properly

## Usage

To use the SmartBond smart contract, follow the steps below:

1. Check Ethereum Version: Ensure that your project has at least Ethereum version 6.0 installed `npm i ethers@6.0`. You can check the installed version by running the command npx hardhat version.

2. Deploy the SmartBond contract:

   - Open a terminal and navigate to your project directory.
   - Run the deploy command to deploy the SmartBond contract using Hardhat: -`npx hardhat run --network localhost scripts/deploy.js`

3. Start the React Web UI:

   - This time Ethereum Version needs to be under 6.0 `npm i ethers@5.6.1`.
   - Run the command npm start to start the React development server.
   - Access the SmartBond web interface by opening a web browser and visiting the specified URL (usually http://localhost:3000 or as indicated in the terminal).

4. Interact with the SmartBond contract:
   - Sign the contract by calling the `signBond` function and transfer the face value to the issuer.
   - Pay out the interest amount to the owner by calling the `payInterestRate` function.
   - Redeem the bond and receive the full face value by calling the `redeemBond` function.

## Note

- Please note that the SmartBond smart contract is a simple example and may require further customization and enhancements to meet specific requirements.
- Make sure you have the necessary Ethereum infrastructure in place to interact with the smart contract and consider transaction fees and other aspects of the Ethereum blockchain.
- It is recommended that you thoroughly test the smart contract before using it and ensure that it meets the requirements and security standards.
- This is not financial or legal advice. Consult a professional if needed to ensure your requirements and legal obligations are met.

Another Note: This project is licensed as "Unlicensed".

---

# SmartBond deutsche Version

SmartBond ist ein Smart Contract, der die Ausgabe, den Handel und das Management von Anleihen auf der Ethereum-Blockchain ermöglicht.

## Funktionen

Der Smart Contract SmartBond bietet folgende Funktionen:

- **Initialisierung**: Bei Verwendung des Smart Contracts SmartBond müssen verschiedene Parameter festgelegt werden, einschließlich des Namens des Emittenten, der Adresse des Emittenten, des Namens des Eigentümers, des Fälligkeitsdatums, des Nennwerts, des Zinssatzes und der Zahlungsfrequenz. Dies kann im Ordner "scripts" erfolgen, indem die Datei "deploy.js" geöffnet wird.

- **Unterzeichnung des Vertrags**: Der Emittent kann den Smart Contract SmartBond durch Aufruf der Funktion "signBond" unterzeichnen, indem der Nennwert der Anleihe in Ether an die Adresse des Emittenten überwiesen wird.

- **Zinszahlung**: Der Smart Contract SmartBond ermöglicht die Zahlung von Zinsen an den Eigentümer der Anleihe. Die Funktion "payInterestRate" berechnet den Zinszahlungsbetrag basierend auf dem Nennwert und dem angegebenen Zinssatz und überweist ihn.

- **Einlösung der Anleihe**: Nach Erreichen des Fälligkeitsdatums kann der Eigentümer die Anleihe einlösen und den vollen Nennwert erhalten. Die Funktion "redeemBond" löst die Anleihe ein, indem der Äquivalentwert des Nennwerts in Ether berechnet und an die Adresse des Eigentümers überwiesen wird.

## Leider funktionieren die Funktionen nicht wie beabsichtigt und müssen überarbeitet werden, um ordnungsgemäß zu funktionieren.

## Verwendung

Um den Smart Contract SmartBond zu verwenden, befolgen Sie die folgenden Schritte:

1. Überprüfen der Ethereum-Version: Stellen Sie sicher, dass Ihr Projekt mindestens Ethereum-Version 6.0 installiert hat `npm i ethers@6.0`. Sie können die installierte Version überprüfen, indem Sie den Befehl `npx hardhat version` ausführen.

2. Bereitstellung des Smart Contracts SmartBond:

   - Öffnen Sie ein Terminal und navigieren Sie zu Ihrem Projektverzeichnis.
   - Führen Sie den Bereitstellungsbefehl aus, um den Smart Contract SmartBond mithilfe von Hardhat bereitzustellen:
     - `npx hardhat run --network localhost scripts/deploy.js`

3. Starten der React Web UI:

   - In diesem Fall muss die Ethereum-Version unter 6.0 liegen `npm i ethers@5.6.1`.
   - Führen Sie den Befehl `npm start` aus, um den React-Entwicklungsserver zu starten.
   - Öffnen Sie einen Webbrowser und greifen Sie über die angegebene URL auf die SmartBond-Web-Benutzeroberfläche zu (in der Regel http://localhost:3000 oder wie im Terminal angegeben).

4. Interaktion mit dem Smart Contract SmartBond:
   - Unterzeichnen Sie den Vertrag, indem Sie die Funktion "signBond" aufrufen und den Nennwert an den Emittenten überweisen.
   - Zahlen Sie den Zinsbetrag an den Eigentümer aus, indem Sie die Funktion "payInterestRate" aufrufen.
   - Lösen Sie die Anleihe ein und erhalten Sie den vollen Nennwert, indem Sie die Funktion "redeemBond" aufrufen.

## Hinweis

- Beachten Sie bitte, dass der Smart Contract SmartBond ein einfaches Beispiel ist und möglicherweise weitere Anpassungen und Verbesserungen erfordert, um spezifische Anforderungen zu erfüllen.
- Stellen Sie sicher, dass Sie die erforderliche Ethereum-Infrastruktur haben, um mit dem Smart Contract zu interagieren, und berücksichtigen Sie Transaktionsgebühren und andere Aspekte der Ethereum-Blockchain.
- Es wird empfohlen, den Smart Contract vor der Verwendung gründlich zu testen und sicherzustellen, dass er den Anforderungen und Sicherheitsstandards entspricht.
- Dies stellt keine finanzielle oder rechtliche Beratung dar. Konsultieren Sie bei Bedarf einen Fachexperten, um sicherzustellen, dass Ihre Anforderungen und rechtlichen Verpflichtungen erfüllt sind.

---

noch ein Hinweis: Dieses Projekt ist lizenziert als "Unlicensed".
