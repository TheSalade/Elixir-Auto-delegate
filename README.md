# Elixir-Auto-delegate
Auto send ETH, claim and delegate token to your node (Sepolia)

# Tutorial: How to Use Elixir Script

Follow these steps to set up and use Elixir Script:

1. **Download Visual Studio Code:**
   - [Download Visual Studio Code](https://code.visualstudio.com/)

2. **Download Node.js:**
   - [Download Node.js](https://nodejs.org/en)

3. **Prepare Your Scripts:**
   - Place the three scripts in the same folder.

4. **Set Up in Visual Studio Code:**
   - Open Visual Studio Code.
   - Open the folder containing the scripts.
     
  ![image](https://github.com/user-attachments/assets/586c9e99-a31c-4af5-bd94-d5facd67e0b2)

5. **Open a terminal cmd and execute all this command:**
    - npm install ethers
    - npm install web3
    - npm install bip39
    - npm install ethereumjs-wallet@0.6.5

6. **Run the newSEED.js script to get a new wallet**
![image](https://github.com/user-attachments/assets/f4ecacb9-6496-40a0-bbad-a484884f47b0)

7. Copy the wallet address and send some ETH Sepolia (you can obtain eth from this faucet : https://sepolia-faucet.pk910.de/
8. Copy the seed phrase and copy it in mnenomic in sendETH.js and autofarmelixir.js script (after the modification use CTRL+S to save)
9. Launch the sendETH.js script in a new terminal windows (In the top section terminal => new terminal)  and write node sendETH.js
![image](https://github.com/user-attachments/assets/ee6d8ad1-6827-4e30-8fdc-9b5b0bad4d41)
if it work you see something like this
![image](https://github.com/user-attachments/assets/e9743d35-15c1-4bed-a610-8b35b735a01b)
let the script work it can take a lot of time because he make one transaction by one transaction and the network is not really fast
10. When the process of sendeth script is finish open the autofarmelixir.js script and replace delegationaddress by the address of your node
![image](https://github.com/user-attachments/assets/61d976cc-13e1-4fdd-a7af-6782d7d63c47)

11. Launch the autofarmelixir.js script => node autofarmelixir.js
    
![image](https://github.com/user-attachments/assets/5f62aa24-f5b8-4111-9d99-4088e24f9c5b)

13. Step by step new adress will delegate token to your node

