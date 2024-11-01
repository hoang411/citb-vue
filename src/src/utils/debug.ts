// src/utils/debug.ts
import { console } from 'console'

export function debugLog(message: string, data?: any) {
    console.log(message, data)
}

export function debugError(message: string, error: any) {
    console.error(message, error)
}