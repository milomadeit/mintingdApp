import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './Inventory.css';
import loading from './loading.gif'


const abi = [
    {
        "inputs": [],
        "name": "AlreadyInitialized",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ApprovalCallerNotOwnerNorApproved",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ApprovalQueryForNonexistentToken",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "BalanceQueryForZeroAddress",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newMaxSupply",
                "type": "uint256"
            }
        ],
        "name": "CannotExceedMaxSupplyOfUint64",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "basisPoints",
                "type": "uint256"
            }
        ],
        "name": "InvalidRoyaltyBasisPoints",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "MintERC2309QuantityExceedsLimit",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "maxSupply",
                "type": "uint256"
            }
        ],
        "name": "MintQuantityExceedsMaxSupply",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "MintToZeroAddress",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "MintZeroQuantity",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NewOwnerIsZeroAddress",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotNextOwner",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OnlyAllowedSeaDrop",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OnlyOwner",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OwnerQueryForNonexistentToken",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OwnershipNotInitializedForExtraData",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ProvenanceHashCannotBeSetAfterMintStarted",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RoyaltyAddressCannotBeZeroAddress",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SameTransferValidator",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SignersMismatch",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TokenGatedMismatch",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TransferCallerNotOwnerNorApproved",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TransferFromIncorrectOwner",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TransferToNonERC721ReceiverImplementer",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TransferToZeroAddress",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "URIQueryForNonexistentToken",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "allowedSeaDrop",
                "type": "address[]"
            }
        ],
        "name": "AllowedSeaDropUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_fromTokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_toTokenId",
                "type": "uint256"
            }
        ],
        "name": "BatchMetadataUpdate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "fromTokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "toTokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "ConsecutiveTransfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "newContractURI",
                "type": "string"
            }
        ],
        "name": "ContractURIUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "version",
                "type": "uint8"
            }
        ],
        "name": "Initialized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newMaxSupply",
                "type": "uint256"
            }
        ],
        "name": "MaxSupplyUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "newPotentialAdministrator",
                "type": "address"
            }
        ],
        "name": "PotentialOwnerUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "previousHash",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "newHash",
                "type": "bytes32"
            }
        ],
        "name": "ProvenanceHashUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "bps",
                "type": "uint256"
            }
        ],
        "name": "RoyaltyInfoUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "SeaDropTokenDeployed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "oldValidator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "newValidator",
                "type": "address"
            }
        ],
        "name": "TransferValidatorUpdated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "baseURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "cancelOwnershipTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contractURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "fromTokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "toTokenId",
                "type": "uint256"
            }
        ],
        "name": "emitBatchMetadataUpdate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "minter",
                "type": "address"
            }
        ],
        "name": "getMintStats",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "minterNumMinted",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "currentTotalSupply",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "maxSupply",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTransferValidationFunction",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "functionSignature",
                "type": "bytes4"
            },
            {
                "internalType": "bool",
                "name": "isViewFunction",
                "type": "bool"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTransferValidator",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "__name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "__symbol",
                "type": "string"
            },
            {
                "internalType": "address[]",
                "name": "allowedSeaDrop",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "initialOwner",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "minter",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            }
        ],
        "name": "mintSeaDrop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "maxSupply",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "baseURI",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "contractURI",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "seaDropImpl",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint80",
                                "name": "mintPrice",
                                "type": "uint80"
                            },
                            {
                                "internalType": "uint48",
                                "name": "startTime",
                                "type": "uint48"
                            },
                            {
                                "internalType": "uint48",
                                "name": "endTime",
                                "type": "uint48"
                            },
                            {
                                "internalType": "uint16",
                                "name": "maxTotalMintableByWallet",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "feeBps",
                                "type": "uint16"
                            },
                            {
                                "internalType": "bool",
                                "name": "restrictFeeRecipients",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct PublicDrop",
                        "name": "publicDrop",
                        "type": "tuple"
                    },
                    {
                        "internalType": "string",
                        "name": "dropURI",
                        "type": "string"
                    },
                    {
                        "components": [
                            {
                                "internalType": "bytes32",
                                "name": "merkleRoot",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "string[]",
                                "name": "publicKeyURIs",
                                "type": "string[]"
                            },
                            {
                                "internalType": "string",
                                "name": "allowListURI",
                                "type": "string"
                            }
                        ],
                        "internalType": "struct AllowListData",
                        "name": "allowListData",
                        "type": "tuple"
                    },
                    {
                        "internalType": "address",
                        "name": "creatorPayoutAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "provenanceHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "address[]",
                        "name": "allowedFeeRecipients",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "disallowedFeeRecipients",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "allowedPayers",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "disallowedPayers",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "tokenGatedAllowedNftTokens",
                        "type": "address[]"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint80",
                                "name": "mintPrice",
                                "type": "uint80"
                            },
                            {
                                "internalType": "uint16",
                                "name": "maxTotalMintableByWallet",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint48",
                                "name": "startTime",
                                "type": "uint48"
                            },
                            {
                                "internalType": "uint48",
                                "name": "endTime",
                                "type": "uint48"
                            },
                            {
                                "internalType": "uint8",
                                "name": "dropStageIndex",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint32",
                                "name": "maxTokenSupplyForStage",
                                "type": "uint32"
                            },
                            {
                                "internalType": "uint16",
                                "name": "feeBps",
                                "type": "uint16"
                            },
                            {
                                "internalType": "bool",
                                "name": "restrictFeeRecipients",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct TokenGatedDropStage[]",
                        "name": "tokenGatedDropStages",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "disallowedTokenGatedAllowedNftTokens",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "signers",
                        "type": "address[]"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint80",
                                "name": "minMintPrice",
                                "type": "uint80"
                            },
                            {
                                "internalType": "uint24",
                                "name": "maxMaxTotalMintableByWallet",
                                "type": "uint24"
                            },
                            {
                                "internalType": "uint40",
                                "name": "minStartTime",
                                "type": "uint40"
                            },
                            {
                                "internalType": "uint40",
                                "name": "maxEndTime",
                                "type": "uint40"
                            },
                            {
                                "internalType": "uint40",
                                "name": "maxMaxTokenSupplyForStage",
                                "type": "uint40"
                            },
                            {
                                "internalType": "uint16",
                                "name": "minFeeBps",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "maxFeeBps",
                                "type": "uint16"
                            }
                        ],
                        "internalType": "struct SignedMintValidationParams[]",
                        "name": "signedMintValidationParams",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "disallowedSigners",
                        "type": "address[]"
                    }
                ],
                "internalType": "struct ERC721SeaDropStructsErrorsAndEvents.MultiConfigureStruct",
                "name": "config",
                "type": "tuple"
            }
        ],
        "name": "multiConfigure",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "provenanceHash",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "royaltyAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "royaltyBasisPoints",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_salePrice",
                "type": "uint256"
            }
        ],
        "name": "royaltyInfo",
        "outputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "royaltyAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "newBaseURI",
                "type": "string"
            }
        ],
        "name": "setBaseURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "newContractURI",
                "type": "string"
            }
        ],
        "name": "setContractURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newMaxSupply",
                "type": "uint256"
            }
        ],
        "name": "setMaxSupply",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "newProvenanceHash",
                "type": "bytes32"
            }
        ],
        "name": "setProvenanceHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "royaltyAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint96",
                        "name": "royaltyBps",
                        "type": "uint96"
                    }
                ],
                "internalType": "struct ISeaDropTokenContractMetadata.RoyaltyInfo",
                "name": "newInfo",
                "type": "tuple"
            }
        ],
        "name": "setRoyaltyInfo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newValidator",
                "type": "address"
            }
        ],
        "name": "setTransferValidator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newPotentialOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "seaDropImpl",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "merkleRoot",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "string[]",
                        "name": "publicKeyURIs",
                        "type": "string[]"
                    },
                    {
                        "internalType": "string",
                        "name": "allowListURI",
                        "type": "string"
                    }
                ],
                "internalType": "struct AllowListData",
                "name": "allowListData",
                "type": "tuple"
            }
        ],
        "name": "updateAllowList",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "seaDropImpl",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "feeRecipient",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "allowed",
                "type": "bool"
            }
        ],
        "name": "updateAllowedFeeRecipient",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "allowedSeaDrop",
                "type": "address[]"
            }
        ],
        "name": "updateAllowedSeaDrop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "seaDropImpl",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "payoutAddress",
                "type": "address"
            }
        ],
        "name": "updateCreatorPayoutAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "seaDropImpl",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "dropURI",
                "type": "string"
            }
        ],
        "name": "updateDropURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "seaDropImpl",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "payer",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "allowed",
                "type": "bool"
            }
        ],
        "name": "updatePayer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "seaDropImpl",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "uint80",
                        "name": "mintPrice",
                        "type": "uint80"
                    },
                    {
                        "internalType": "uint48",
                        "name": "startTime",
                        "type": "uint48"
                    },
                    {
                        "internalType": "uint48",
                        "name": "endTime",
                        "type": "uint48"
                    },
                    {
                        "internalType": "uint16",
                        "name": "maxTotalMintableByWallet",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint16",
                        "name": "feeBps",
                        "type": "uint16"
                    },
                    {
                        "internalType": "bool",
                        "name": "restrictFeeRecipients",
                        "type": "bool"
                    }
                ],
                "internalType": "struct PublicDrop",
                "name": "publicDrop",
                "type": "tuple"
            }
        ],
        "name": "updatePublicDrop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "seaDropImpl",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "signer",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "uint80",
                        "name": "minMintPrice",
                        "type": "uint80"
                    },
                    {
                        "internalType": "uint24",
                        "name": "maxMaxTotalMintableByWallet",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint40",
                        "name": "minStartTime",
                        "type": "uint40"
                    },
                    {
                        "internalType": "uint40",
                        "name": "maxEndTime",
                        "type": "uint40"
                    },
                    {
                        "internalType": "uint40",
                        "name": "maxMaxTokenSupplyForStage",
                        "type": "uint40"
                    },
                    {
                        "internalType": "uint16",
                        "name": "minFeeBps",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint16",
                        "name": "maxFeeBps",
                        "type": "uint16"
                    }
                ],
                "internalType": "struct SignedMintValidationParams",
                "name": "signedMintValidationParams",
                "type": "tuple"
            }
        ],
        "name": "updateSignedMintValidationParams",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "seaDropImpl",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "allowedNftToken",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "uint80",
                        "name": "mintPrice",
                        "type": "uint80"
                    },
                    {
                        "internalType": "uint16",
                        "name": "maxTotalMintableByWallet",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint48",
                        "name": "startTime",
                        "type": "uint48"
                    },
                    {
                        "internalType": "uint48",
                        "name": "endTime",
                        "type": "uint48"
                    },
                    {
                        "internalType": "uint8",
                        "name": "dropStageIndex",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint32",
                        "name": "maxTokenSupplyForStage",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint16",
                        "name": "feeBps",
                        "type": "uint16"
                    },
                    {
                        "internalType": "bool",
                        "name": "restrictFeeRecipients",
                        "type": "bool"
                    }
                ],
                "internalType": "struct TokenGatedDropStage",
                "name": "dropStage",
                "type": "tuple"
            }
        ],
        "name": "updateTokenGatedDrop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];


const ipfsGateway = "https://ipfs.io/ipfs/";

const convertIpfsUrlToHttp = (url) => {
    if (url.startsWith("ipfs://")) {
        return url.replace("ipfs://", ipfsGateway);
    }
    return url;
};

function GetTokens({ contractAddress }) {
    const [nfts, setNfts] = useState([]);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);
    const [totalNFTs, setTotalNFTs] = useState(0);
    const [loadingGif, setLoadingGif] = useState(true);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const _provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
                const network = await _provider.getNetwork();
                if (network.chainId !== 1329) {
                    window.alert('Please connect to the SEI network.');
                    throw new Error('Please connect to the SEI network.');
                }
                setProvider(_provider);
                const _signer = _provider.getSigner();
                setSigner(_signer);
                const _account = await _signer.getAddress();
                setAccount(_account);
            } catch (error) {
                console.error('User denied account access or other error:', error);
                setError(error.message);
            }
        } else {
            console.error('No Ethereum provider found. Install MetaMask.');
            setError('No Ethereum provider found. Install MetaMask.');
        }
    };

    useEffect(() => {
        const fetchNFTs = async () => {
            if (!provider || !signer || !account) return;
            setLoadingGif(true);

            const contract = new ethers.Contract(contractAddress, abi, signer);

            try {
                const balance = await contract.balanceOf(account);
                setTotalNFTs(Number(balance));
                console.log(`Balance of NFTs: ${balance}`);

                const totalSupply = await contract.totalSupply();
                console.log(`Total Supply of NFTs: ${totalSupply}`);

                const nftDetails = [];
                for (let tokenId = 1; tokenId < totalSupply; tokenId++) {
                    try {
                        const owner = await contract.ownerOf(tokenId);
                        if (owner.toLowerCase() === account.toLowerCase()) {
                            const tokenURI = await contract.tokenURI(tokenId);
                            const httpUri = convertIpfsUrlToHttp(tokenURI);
                            console.log(`Token URI: ${httpUri}`);
                            const metadataResponse = await fetch(httpUri);
                            if (!metadataResponse.ok) {
                                throw new Error(`Failed to fetch metadata: ${metadataResponse.statusText}`);
                            }
                            const metadata = await metadataResponse.json();
                            const imageHttpUri = convertIpfsUrlToHttp(metadata.image);
                            nftDetails.push({ ...metadata, image: imageHttpUri, token_id: tokenId });
                        }
                    } catch (innerError) {
                        console.error(`Error fetching token details for token ID ${tokenId}:`, innerError);
                        setError(innerError.message);
                    }
                }

                setNfts(nftDetails);
            } catch (error) {
                console.error('Error fetching NFTs:', error);
                setError(error.message);
            } finally {
                setLoadingGif(false);
            }
        };

        fetchNFTs();
    }, [provider, signer, account, contractAddress]);

    return (
        <div className="get-tokens-div">
            {!account ? (
                <button onClick={connectWallet} className="connect-wallet-button">
                    Connect Wallet
                </button>
            ) : (
                <>
                    <h2>Connected Account: {account}</h2>
                    {error && <p className="error-message">Error: {error}</p>}
                    {loadingGif ? (
                        <div className="loading-div">
                            <img className='loading' src={loading} alt="Loading" />
                        </div>
                    ) : (
                        nfts.length > 0 ? (
                            nfts.map((nft, index) => (
                                <div className="card-div" key={index}>
                                    <div className="nft-div">
                                        <img className="nft-img" src={nft.image} alt={nft.name} />
                                        <p className="nft-name">{nft.name}</p>
                                        <p className="nft-description">{nft.description}</p>
                                        {nft.external_url && (
                                            <a href={nft.external_url} target="_blank" rel="noopener noreferrer" className="nft-external-url">
                                                View on Market
                                            </a>
                                        )}
                                        {nft.attributes && nft.attributes.map((attr, idx) => (
                                            <p key={idx} className="nft-attribute">{attr.trait_type}: {attr.value}</p>
                                        ))}
                                    </div>
                                    <button className="opt-in-button">REDEEM</button>
                                </div>
                            ))
                        ) : (
                            <p>{totalNFTs} NFTs found in your wallet.</p>
                        )
                    )}
                </>
            )}
        </div>
    );
}

export default GetTokens;