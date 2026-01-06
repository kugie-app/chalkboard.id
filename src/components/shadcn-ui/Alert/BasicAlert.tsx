
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/shadcn-ui/Default-Ui/alert"
  import { Terminal } from "lucide-react"
import BasicAlertCode from './code/BasicAlertCode'

const BasicAlert = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Basic Alert</h4>
               <BasicAlertCode/>
            </div>
            <div className="flex flex-col gap-3 mt-4">
                <Alert variant="primary">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="text-white">Primary Alert!</AlertTitle>
                    <AlertDescription>
                        Use our highly customizable component
                    </AlertDescription>
                </Alert>
                <Alert variant="secondary">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="text-white">Secondary Alert!</AlertTitle>
                    <AlertDescription>
                        Use our highly customizable component
                    </AlertDescription>
                </Alert>
                <Alert variant="success">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="text-white">Success Alert!</AlertTitle>
                    <AlertDescription>
                        Use our highly customizable component
                    </AlertDescription>
                </Alert>
                <Alert variant="warning">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="text-white">Warning Alert!</AlertTitle>
                    <AlertDescription>
                        Use our highly customizable component
                    </AlertDescription>
                </Alert>
                <Alert variant="error">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="text-white">Error Alert!</AlertTitle>
                    <AlertDescription>
                        Use our highly customizable component
                    </AlertDescription>
                </Alert>
                <Alert variant="info">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="text-white">Info Alert!</AlertTitle>
                    <AlertDescription>
                        Use our highly customizable component
                    </AlertDescription>
                </Alert>
            </div>
        </CardBox>
    )
}

export default BasicAlert