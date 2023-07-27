<template>
    <div class="p-2">
            <table class="min-w-full text-center">
                <thead class="font-medium border-b border-slate-400 ">
                    <tr>
                        <th class="p-2">#</th>
                        <th scope="col" class="p-2">Image</th>
                        <th scope="col" class="p-2">Address</th>
                        <th scope="col" class="p-2">User Id</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="n in 10">
                        <td class="p-2 border-b dark:border-neutral-400">{{ n }}</td>
                        <td class="p-2 border-b dark:border-neutral-400">
                            <img src="../../assets/House_Fire_Logo.png" alt=""
                                class="w-12 h-6 m-auto border border-slate-400 ">
                        </td>
                        <td class="p-2 border-b dark:border-neutral-400">Hagonoy</td>
                        <td class="p-2 border-b dark:border-neutral-400">DD435Gd-FD34</td>
                    </tr>
                </tbody>
            </table>
        <!-- <div class="flex justify-center font-semibold w-full gap-2 hover:cursor-default">
            <div class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">&lt;&lt;</div>
            <div class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">&lt;</div>
            <div class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">1</div>
            <div class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">&gt;</div>
            <div class="flex justify-center items-center w-10 h-10 border border-black rounded-lg">&gt;&gt;</div>
        </div> -->
    </div>
</template>