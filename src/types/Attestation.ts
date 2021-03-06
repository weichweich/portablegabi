/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable-next-line max-classes-per-file */
import Accumulator from '../attestation/Accumulator'
import WasmData from './Wasm'

export type KeyLength = 1024 | 2048 | 4096
export const DEFAULT_MAX_ATTRIBUTES = 70
export const DEFAULT_VALIDITY_DURATION = 365
export const DEFAULT_KEY_LENGTH = 1024

export interface IGabiMsgSession {
  message: string
  session: string
}

export default interface IAttester {
  publicKey: AttesterPublicKey
  createAccumulator: Function
  startAttestation: Function
  issueAttestation: Function
  revokeAttestation: Function
}

/**
 * The off-chain public key of the [[Attester]].
 */
export class AttesterPublicKey extends WasmData {
  // @ts-ignore
  private thisIsOnlyHereToPreventClassMixes: int
}

/**
 * The off-chain private key of the [[Attester]].
 */
export class AttesterPrivateKey extends WasmData {
  // @ts-ignore
  private thisIsOnlyHereToPreventClassMixes: int
}

/**
 * A session returned by [[startAttestation]] which should be kept private by the [[Attester]] and used in [[issueAttestation]].
 */
export class AttesterAttestationSession extends WasmData {
  // @ts-ignore
  private thisIsOnlyHereToPreventClassMixes: int
}

/**
 * A message returned by [[startAttestation]] which should be sent to the [[Claimer]] and used in [[requestAttestation]].
 */
export class InitiateAttestationRequest extends WasmData {
  // @ts-ignore
  private thisIsOnlyHereToPreventClassMixes: int
}

/**
 * The result of an issuance process returned by [[issueAttestation]] together with [[Attestation]].
 */
export class Witness extends WasmData {
  // @ts-ignore
  private thisIsOnlyHereToPreventClassMixes: int
}

/**
 * The result of an issuance process returned by [[issueAttestation]] together with [[Witness]].
 */
export class Attestation extends WasmData {
  public parse(): IIssueAttestation {
    return JSON.parse(this.toString())
  }
}

export interface IAttesterChain extends IAttester {
  address: string
  revokeAttestation: ({
    witnesses,
    accumulator,
  }: {
    witnesses: Witness[]
    accumulator?: Accumulator
  }) => Promise<Accumulator>
  updateAccumulator: (accumulator: Accumulator) => Promise<void>
}

export interface IIssueAttestation {
  nonrev: {
    Updated: string
    e: string
    sacc: {
      data: string
      pk: number
    }
  }
  proof: {
    c: string
    e_response: string
  }
  signature: {
    A: 'string'
    KeyShareP: string | null
    e: string
    v: string
  }
}
