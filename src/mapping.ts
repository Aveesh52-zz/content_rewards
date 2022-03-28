import { BigInt } from "@graphprotocol/graph-ts"
import {
  AddedReward,
  RedeemedReward
} from "../generated/contentrewards/contentrewards"
import { AddedRewardsEntity, RedeemRewardsEntity } from "../generated/schema"

export function handleAddedReward(event: AddedReward): void {
   
  let entity = AddedRewardsEntity.load(event.transaction.from.toHex())
  if (!entity) {
    entity = new AddedRewardsEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }
 // let entitybalanceEntity = new Balance(event.transaction.hash.toHex());
  entity.owner = event.params.recipient
  entity.count = event.params.amount

  entity.save()
}


export function handleRedeemedReward(event: RedeemedReward): void {
   
  let entity = RedeemRewardsEntity.load(event.transaction.from.toHex())
  if (!entity) {
    entity = new RedeemRewardsEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }
 // let entitybalanceEntity = new Balance(event.transaction.hash.toHex());
  entity.owner = event.params.recipient
  entity.count = event.params.amount
  entity.approved = event.params.rewardType

  entity.save()
}