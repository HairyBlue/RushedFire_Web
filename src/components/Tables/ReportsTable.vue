<template>
    <div class="border border-slate-300 bg-white rounded">
        <table class="min-w-full text-left">
            <thead class="font-medium border-b border-slate-400 ">
                <tr>
                    <th class="p-2">#</th>
                    <th scope="col" class="p-2">name</th>
                    <th scope="col" class="p-2">age</th>
                    <th scope="col" class="p-2">address</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="n in 10">
                    <td class="p-2 border-b dark:border-neutral-400">{{ n }}</td>
                    <td class="p-2 border-b dark:border-neutral-400">Hairy Blue</td>
                    <td class="p-2 border-b dark:border-neutral-400">23</td>
                    <td class="p-2 border-b dark:border-neutral-400">hagonoy</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>