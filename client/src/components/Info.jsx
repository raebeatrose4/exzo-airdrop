import { Heading,Text } from '@chakra-ui/react'
import React from 'react'
import {
    ListItem,
    UnorderedList,
  } from '@chakra-ui/react'

function Info() {
  return (
    <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <div>
      <Heading as='h2' size='xl' style={{ borderBottom: '2px solid #ccc' }}>
      EXZO Network<span style={{ backgroundColor: '#2ef2b1' }}> Airdrop</span>
      </Heading>
        </div>
<div style={{margin:'20px',maxWidth:'50%'}}>
<Text fontSize='lg'>
           The wait is finally over! Now you can claim your tokens on Ethereum Mainnet. Which you can later bridge to EXZO Network!
          </Text>
          <br />
          <Text fontSize='md' fontWeight='600' color='#2ef2b1' backgroundColor='black' maxWidth='fit-content' padding='3px'>Eligibility Criteria & Requirements</Text>
          <UnorderedList>
  <ListItem>You must own WXZO on BSC Chain</ListItem>
  <ListItem>If you want to claim your funds you must click on Claim button and pay gas fees, then XZO tokens will be immediately sent to your wallet </ListItem>
  <ListItem>Make sure you are logged into same account in which you have tokens on different network</ListItem>
</UnorderedList>
          <br />
          <Text fontSize='md' fontWeight='600' color='#2ef2b1' backgroundColor='black' maxWidth='fit-content' padding='3px'>Usage</Text>
          <UnorderedList>
  <ListItem>If Ethereum mainnet is not added to your Metamask, click on the buttom at bottom left.</ListItem>
  <ListItem>After adding the Ethereum Mainnet, click on top right button to Connect Wallet, make sure you connect the wallet in which you have tokens on BSC network.</ListItem>
  <ListItem>Click on claim buttton and pay gas fees and tokens will be immediately sent to your wallet!</ListItem>
</UnorderedList>
</div>
    </div>
  )
}

export default Info
