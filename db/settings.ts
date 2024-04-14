import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getSettingsById = async (settingsId: string) => {
  const { data: settings, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", settingsId)
    .single()

  if (!settings) {
    throw new Error(error.message)
  }

  return settings
}

export const getSettingsByWorkspaceId = async (workspaceId: string) => {
  const { data: chats, error } = await supabase
    .from("settings")
    .select("*")
    .eq("workspace_id", workspaceId)
  if (!chats) {
    throw new Error(error.message)
  }

  return chats
}

export const getSettingsWorkspacesBySettingsId = async (settingsId: string) => {
  const { data: settings, error } = await supabase
    .from("settings")
    .select(
      `
      id, 
      name, 
      workspaces (*)
    `
    )
    .eq("id", settingsId)
    .single()

  if (!settings) {
    throw new Error(error.message)
  }

  return settings
}

export const createSettings = async (
  settings: TablesInsert<"settings">,
  workspace_id: string
) => {
  const { data: createdSettings, error } = await supabase
    .from("settings")
    .insert([settings])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  await createSettingsWorkspace({
    user_id: settings.user_id,
    settings_id: createdSettings.id,
    workspace_id: workspace_id
  })

  return createdSettings
}

export const createSettingsWorkspace = async (item: {
  user_id: string
  settings_id: string
  workspace_id: string
}) => {
  const { data: createdSettingsWorkspace, error } = await supabase
    .from("settings_workspaces")
    .insert([item])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return createdSettingsWorkspace
}

export const createSettingsWorkspaces = async (
  items: { user_id: string; settings_id: string; workspace_id: string }[]
) => {
  const { data: createdSettingsWorkspaces, error } = await supabase
    .from("settings_workspaces")
    .insert(items)
    .select("*")

  if (error) throw new Error(error.message)

  return createdSettingsWorkspaces
}

export const updateSettings = async (
  settingsId: string,
  settings: TablesUpdate<"settings">
) => {
  const { data: updatedSettings, error } = await supabase
    .from("settings")
    .update(settings)
    .eq("id", settingsId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return updatedSettings
}

export const deleteSettings = async (settingsId: string) => {
  const { error } = await supabase
    .from("settings")
    .delete()
    .eq("id", settingsId)

  if (error) {
    throw new Error(error.message)
  }

  return true
}

export const deleteSettingsWorkspace = async (
  settingsId: string,
  workspaceId: string
) => {
  const { error } = await supabase
    .from("settings_workspaces")
    .delete()
    .eq("settings_id", settingsId)
    .eq("workspace_id", workspaceId)

  if (error) throw new Error(error.message)

  return true
}
