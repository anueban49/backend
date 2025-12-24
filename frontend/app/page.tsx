'use client'
import BaseStructucture from '../app/_components/BaseSctructure';
import { PromoBanner } from './_components/PromoBanner';
import { DisplayShelf } from './_components/DisplayShelf';
export default function HomePage() {
  return (
    <BaseStructucture>
    <DisplayShelf></DisplayShelf>
    <DisplayShelf></DisplayShelf>
    </BaseStructucture>
    
  )
}