"use client"

import { FitpalAIContext } from "@/context/context"
import { getProfileByUserId, updateProfile } from "@/db/profile"
import {
  getHomeWorkspaceByUserId,
  getWorkspacesByUserId
} from "@/db/workspaces"
import { supabase } from "@/lib/supabase/browser-client"
import { TablesUpdate } from "@/supabase/types"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { MacrosStep } from "../../../components/setup/macros-step"
import { FinishStep } from "../../../components/setup/finish-step"
import { ProfileStep } from "../../../components/setup/profile-step"
import {
  SETUP_STEP_COUNT,
  StepContainer
} from "../../../components/setup/step-container"
import { getSettingsById, updateSettings } from "@/db/settings"
import { PreferencesStep } from "@/components/setup/preferences-step"
import { DietProvider } from "@/types/settings"

export default function SetupPage() {
  const {
    profile,
    setProfile,
    setWorkspaces,
    setSelectedWorkspace,
    setEnvKeyMap,
    setAvailableHostedModels,
    setAvailableOpenRouterModels,
    setSettings
  } = useContext(FitpalAIContext)

  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [currentStep, setCurrentStep] = useState(1)

  // Profile Step
  const [displayName, setDisplayName] = useState("")
  const [username, setUsername] = useState(profile?.username || "")
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const [protein, setProtein] = useState(25)
  const [carbs, setCarbs] = useState(50)
  const [fat, setFat] = useState(25)
  const [calories, setCalories] = useState(2505)
  const [workouts, setWorkouts] = useState(0)
  const [allergies, setAllergies] = useState<string[]>([])
  const [diet, setDiet] = useState("")
  useEffect(() => {
    ;(async () => {
      const session = (await supabase.auth.getSession()).data.session

      if (!session) {
        return router.push("/login")
      } else {
        const user = session.user

        const profile = await getProfileByUserId(user.id)
        setProfile(profile)
        setUsername(profile.username)

        if (!profile.has_onboarded) {
          setLoading(false)
        } else {
          return router.push(`/`)
        }
      }
    })()
  }, [])

  const handleShouldProceed = (proceed: boolean) => {
    if (proceed) {
      if (currentStep === SETUP_STEP_COUNT) {
        handleSaveSetupSetting()
      } else {
        setCurrentStep(currentStep + 1)
      }
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSaveSetupSetting = async () => {
    const session = (await supabase.auth.getSession()).data.session
    if (!session) {
      return router.push("/login")
    }

    const user = session.user
    const profile = await getProfileByUserId(user.id)
    const settings = await getSettingsById(user.id)
    const updateProfilePayload: TablesUpdate<"profiles"> = {
      ...profile,

      has_onboarded: true,
      display_name: displayName,
      username
    }
    const updatedProfile = await updateProfile(profile.id, updateProfilePayload)

    // updaate local and db settings
    const settingsUpdate: TablesUpdate<"settings"> = {
      ...settings,
      protein,
      carbs,
      fat,
      calories,
      workouts,
      allergies,
      diet: diet as DietProvider
    }
    const updatedSettings = await updateSettings(settings.id, settingsUpdate)
    setSettings(updatedSettings)

    setProfile(updatedProfile)

    return router.push(`/`)
  }

  const renderStep = (stepNum: number) => {
    switch (stepNum) {
      // Profile Step
      case 1:
        return (
          <StepContainer
            stepDescription="Let's create your profile."
            stepNum={currentStep}
            stepTitle="Welcome to Fitpal"
            onShouldProceed={handleShouldProceed}
            showNextButton={!!(username && usernameAvailable)}
            showBackButton={false}
          >
            <ProfileStep
              username={username}
              usernameAvailable={usernameAvailable}
              displayName={displayName}
              onUsernameAvailableChange={setUsernameAvailable}
              onUsernameChange={setUsername}
              onDisplayNameChange={setDisplayName}
            />
          </StepContainer>
        )

      case 2:
        return (
          <StepContainer
            stepDescription="Enter your preferences!"
            stepNum={currentStep}
            stepTitle="Preferences"
            onShouldProceed={handleShouldProceed}
            showNextButton={true}
            showBackButton={true}
          >
            <PreferencesStep
              allergies={allergies}
              setAllergies={setAllergies}
              diet={diet}
              setDiet={setDiet}
              workouts={workouts}
              setWorkouts={setWorkouts}
            />
          </StepContainer>
        )
      case 3:
        return (
          <StepContainer
            stepDescription="You are all set up!"
            stepNum={currentStep}
            stepTitle="Setup Complete"
            onShouldProceed={handleShouldProceed}
            showNextButton={true}
            showBackButton={true}
          >
            <FinishStep displayName={displayName} />
          </StepContainer>
        )

      default:
        return null
    }
  }

  if (loading) {
    return null
  }

  return (
    <div className="flex h-full items-center justify-center">
      {renderStep(currentStep)}
    </div>
  )
}
