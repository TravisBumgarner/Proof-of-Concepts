import * as t from 'io-ts'
import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'

type DecodeResponseParams = {
    codec: t.TypeC<any>,
    rawResponse: any,
    onError?: (rawResponse?: any) => void,
    onSuccess?: (rawResponse?: any) => void
}

const decodeAPIResponse = (params: DecodeResponseParams) => {
    const onError = params.onError || function (rawResponse: any) { console.error(`Failed on ${JSON.stringify(rawResponse)}`) }
    const onSuccess = params.onSuccess || function (cleanedResponse: any) { console.log(`Succeeded on ${JSON.stringify(cleanedResponse)}`) }

    return pipe(params.codec.decode(params.rawResponse), fold(onError, onSuccess))
}

export {
    decodeAPIResponse
}