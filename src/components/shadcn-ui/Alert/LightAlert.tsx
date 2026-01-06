
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
import LightAlertCode from './code/LightAlertCode'

const LightAlert = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Light Alert</h4> 
               <LightAlertCode/>
            </div>
            <div className="flex flex-col gap-3 mt-4">
                <Alert variant="lightprimary">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="text-primary">Primary Alert!</AlertTitle>
                    <AlertDescription>
                        Use our highly customizable component
                    </AlertDescription>
                </Alert>
                <Alert variant="lightsecondary">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="text-secondary">Secondary Alert!</AlertTitle>
                    <AlertDescription>
                        Use our highly customizable component
                    </AlertDescription>
                </Alert>
                <Alert variant="lightsuccess">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="text-success">Success Alert!</AlertTitle>
                    <AlertDescription>
                        Use our highly customizable component
                    </AlertDescription>
                </Alert>
                <Alert variant="lightwarning">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="text-warning">Warning Alert!</AlertTitle>
                    <AlertDescription>
                        Use our highly customizable component
                    </AlertDescription>
                </Alert>
                <Alert variant="lighterror">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="text-error">Error Alert!</AlertTitle>
                    <AlertDescription>
                        Use our highly customizable component
                    </AlertDescription>
                </Alert>
                <Alert variant="lightinfo">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle className="text-info">Info Alert!</AlertTitle>
                    <AlertDescription>
                        Use our highly customizable component
                    </AlertDescription>
                </Alert>
            </div>
        </CardBox>
    )
}

export default LightAlert