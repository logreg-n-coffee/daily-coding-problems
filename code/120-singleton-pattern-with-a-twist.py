class SingletonTwist:
    __instance1 = None
    __instance2 = None
    __count = 0

    def __new__(cls):
        if cls.__instance1 is None:
            cls.__instance1 = super().__new__(cls)
            return cls.__instance1
        elif cls.__instance2 is None:
            cls.__instance2 = super().__new__(cls)
            return cls.__instance2
        else:
            cls.__count += 1
            if cls.__count % 2 == 0:
                return cls.__instance1
            else:
                return cls.__instance2
