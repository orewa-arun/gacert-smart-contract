import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

const id = 1;

describe("Gacert", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployGacert() {

    // Contracts are deployed using the first signer/account by default
    const [owner, applier, approver] = await ethers.getSigners();

    const Gacert = await ethers.getContractFactory("Gacert");
    const gacert = await Gacert.deploy();

    return { gacert, owner, approver, applier };
  }

    describe("Validations", function () {
      it("applier applies and approver approves the certificate", async function () {
        const { gacert,applier,approver} = await loadFixture(deployGacert);

        await gacert.connect(applier).applyCert(id,approver.address);
        const beforeApproval = (await gacert.idToCertificate(id)).isApproved;

        await gacert.connect(approver).approveCert(id);
        const afterApproval = (await gacert.idToCertificate(id)).isApproved;

        expect(beforeApproval).to.be.equal(!afterApproval);
      });
    });
  });
