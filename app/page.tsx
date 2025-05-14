// app/page.tsx
'use client'

import { useState } from 'react'
// Import UI components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// Import custom components
import Header from '@/components/Header'
import BaseURLInput from './components/BaseURLInput'
import UTMInputGroup from './components/UTMInputGroup'
import GenerateButton from './components/GenerateButton'
import ResultsDisplay from './components/ResultsDisplay'