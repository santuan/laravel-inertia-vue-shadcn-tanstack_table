<script setup>
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/Components/ui/menubar";
</script>

<template>
    <Menubar>
        <MenubarMenu>
            <MenubarTrigger>Inicio</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>
                    Nueva pestaña <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                    Nueva ventana <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled> Nueva ventana de incógnito </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                    <MenubarSubTrigger>Compartir</MenubarSubTrigger>
                    <MenubarSubContent>
                        <MenubarItem>Enviar por correo electrónico</MenubarItem>
                        <MenubarItem>Mensajes</MenubarItem>
                        <MenubarItem>Notas</MenubarItem>
                    </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                    Imprimir... <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger>Editar</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>
                    Deshacer <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                    Rehacer <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                    <MenubarSubTrigger>Buscar</MenubarSubTrigger>
                    <MenubarSubContent>
                        <MenubarItem>Buscar en la web</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Buscar...</MenubarItem>
                        <MenubarItem>Buscar siguiente</MenubarItem>
                        <MenubarItem>Buscar anterior</MenubarItem>
                    </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>Cortar</MenubarItem>
                <MenubarItem>Copiar</MenubarItem>
                <MenubarItem>Pegar</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger>Ver</MenubarTrigger>
            <MenubarContent>
                <MenubarCheckboxItem>Mostrar siempre la barra de marcadores</MenubarCheckboxItem>
                <MenubarCheckboxItem checked>
                    Mostrar siempre URLs completas
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset>
                    Recargar <MenubarShortcut>⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled inset>
                    Recargar forzadamente <MenubarShortcut>⇧⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset> Alternar pantalla completa </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset> Ocultar barra lateral </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger>Perfiles</MenubarTrigger>
            <MenubarContent>
                <MenubarRadioGroup value="benoit">
                    <MenubarRadioItem value="andy"> Andy </MenubarRadioItem>
                    <MenubarRadioItem value="benoit"> Benoit </MenubarRadioItem>
                    <MenubarRadioItem value="Luis"> Luis </MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset> Editar... </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset> Agregar perfil... </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    </Menubar>
</template>